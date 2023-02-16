<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\DateType;

class ContactController extends AbstractController
{
    // #[Route('/contact', name: 'app_contact')]
    // public function index(MailerInterface $mailer): Response
    // {

    //     $email = (new Email())
    //     ->from('proyectosymfonyjuegos@gmail.com')
    //     ->to('ferkuko1999@gmail.com')
    //     //->cc('cc@example.com')
    //     //->bcc('bcc@example.com')
    //     //->replyTo('fabien@example.com')
    //     //->priority(Email::PRIORITY_HIGH)
    //     ->subject('¡Contraseña modificada!')
    //     ->text('Sending emails is fun again!')
    //     ->html('<p>Contraseña: 123456</p>');

    //     $mailer->send($email);

    //     return $this->render('contact/index.html.twig', [
    //         'controller_name' => 'ContactController',
    //     ]);
    // }


    #[Route('/contact', name: 'app_contact')]
    public function index2(Request $request,MailerInterface $mailer): Response
    {
  
        if ($request->isMethod('post'))
        {   
            $email = (new Email())
            ->from('proyectosymfonyjuegos@gmail.com')
            ->to('proyectosymfonyjuegos@gmail.com')
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Mensaje de contacto')
            ->html('<p>Nombre:'.$_POST["nombre"].'</p>
                    <p>Email: '.$_POST["email"].'</p>
                    <p>Mensaje: '.$_POST["mensaje"].'</p>');

            $mailer->send($email);
            return $this->redirect($this->generateUrl('app_home'));
        
        }
        return $this->render('contact/index2.html.twig');
    }

}


