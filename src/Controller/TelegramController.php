<?php
// src/Controller/TelegramController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Telegram\Bot\Api;

class TelegramController extends AbstractController
{
    #[Route("/enviaMensaje", name:"enviaMensaje")]
    public function sendMessage(Request $request, Api $telegram, User $usuario, Evento $evento,Participa $participacion )
    {
        $id = $user->getIdTelegram();
        $message = 'Usted ha sido intida a participar en el evento'.$evento->getNombre().'
                    con el codigo de invitacion: '.$participacion->getCodInvitacion().' 
                    Por favor no lo pierda';

        $mensaje = new Api('6275526786:AAGx_6Yr-GvYRtW-slSFCDxKaf32mfyRhdo');
        // Enviar el mensaje utilizando la API de Telegram
        $mensaje->sendMessage([
            'chat_id' => $id,
            'text' => $message,
        ]);

        return $this->json();
    }
}
