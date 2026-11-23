<?php
/**
 * Réception du formulaire de contact (hébergement OVH, PHP).
 * Le formulaire (site/src/features/contact/ContactForm.tsx) envoie ses champs ici en POST ;
 * le message est transmis par e-mail au photographe, avec « Répondre » vers le visiteur.
 *
 * Réponse JSON : { "ok": true } ou { "ok": false, "error": "message lisible" }.
 */

declare(strict_types=1);

// Les erreurs PHP vont dans les journaux du serveur, jamais dans la réponse (elle doit rester du JSON).
ini_set('display_errors', '0');

// Adresse qui reçoit les messages (la changer aussi dans site/src/config/site.ts).
const RECIPIENT = 'dgzphotographie@gmail.com';
// Expéditeur technique : une adresse du domaine hébergé, pour ne pas être classé en spam.
const SENDER = 'contact@dgzphotographie.fr';
const SITE_NAME = 'DGZ Photographie';

// Délai minimal entre l'affichage du formulaire et l'envoi : un humain met plus de 3 secondes.
const MIN_FILL_SECONDS = 3;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Encode un texte accentué pour un en-tête d'e-mail (objet, nom). Sans dépendre de l'extension mbstring. */
function encode_header(string $text): string
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

/** Nombre de caractères d'un texte UTF-8. */
function char_count(string $text): int
{
    $count = preg_match_all('/./su', $text);
    // Texte mal encodé : on compte les octets, ce qui reste une borne haute.
    return $count === false ? strlen($text) : $count;
}

/** Retire les retours à la ligne : empêche l'injection d'en-têtes dans l'e-mail. */
function single_line(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Méthode non autorisée.']);
}

$name = single_line((string) ($_POST['nom'] ?? ''));
$email = single_line((string) ($_POST['email'] ?? ''));
$phone = single_line((string) ($_POST['tel'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$honeypot = (string) ($_POST['site_web'] ?? '');
$startedAt = (int) ($_POST['debut'] ?? 0);

// Anti-robots : champ invisible rempli, ou formulaire envoyé trop vite.
// On répond « ok » pour ne pas renseigner le robot, mais rien n'est envoyé.
if ($honeypot !== '' || ($startedAt > 0 && time() - intdiv($startedAt, 1000) < MIN_FILL_SECONDS)) {
    respond(200, ['ok' => true]);
}

if ($name === '' || $email === '' || $message === '') {
    respond(422, ['ok' => false, 'error' => 'Merci de renseigner votre nom, votre email et votre message.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => "L'adresse email ne semble pas valide."]);
}
if (char_count($name) > 100 || char_count($phone) > 30 || char_count($message) > 5000) {
    respond(422, ['ok' => false, 'error' => 'Un des champs est trop long.']);
}

$subject = encode_header("Nouveau message de {$name} — " . SITE_NAME);

$body = implode("\n", [
    'Nouveau message reçu depuis le formulaire de contact du site.',
    '',
    "Nom : {$name}",
    "Email : {$email}",
    'Téléphone : ' . ($phone !== '' ? $phone : 'non renseigné'),
    '',
    'Message :',
    $message,
    '',
    '—',
    'Répondez simplement à cet email pour écrire à la personne.',
]);

$headers = implode("\r\n", [
    'From: ' . encode_header(SITE_NAME) . ' <' . SENDER . '>',
    'Reply-To: ' . encode_header($name) . " <{$email}>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail(RECIPIENT, $subject, $body, $headers)) {
    error_log('Formulaire de contact : échec de mail()');
    respond(500, [
        'ok' => false,
        'error' => "Le message n'a pas pu être envoyé. Vous pouvez m'écrire directement à " . RECIPIENT . '.',
    ]);
}

respond(200, ['ok' => true]);
