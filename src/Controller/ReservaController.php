<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Reserva;
use App\Entity\Tramo;
use App\Entity\User;
use App\Entity\Juego;

class ReservaController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine) {}

    #[Route('/verReservas', name: 'app_listado_reservas')]
    public function index(Request $request,ManagerRegistry $doctrine): Response
    {
        $reservas = $this->doctrine
            ->getRepository(Reserva::class)
            ->findByUser($this->getUser()->getId());
        
        return $this->render('reserva/listadoReservas.html.twig', [
            'controller_name' => 'ReservaController',
            'Reservas' => $reservas,
        ]);
    }

    #[Route('/reserva', name:"reserva")]
    public function reserva( Request $request):response
    {
        $tramos = $this->doctrine
        ->getRepository(Tramo::class)
        ->findAll();

        $juegos = $this->doctrine
        ->getRepository(Juego::class)
        ->findAll();

        return $this->render('reserva/creaReserva.html.twig',['tramos'=>$tramos ,'juegos'=>$juegos]);
    }

    #[Route('/MantenimientoReserva', name:"app_mantenimientoReserva")]
    public function manteReserva( Request $request):response
    {
        $reserva = $this->doctrine
        ->getRepository(Reserva::class)
        ->findAll();



        return $this->render('reserva/manteReserva.html.twig',['reservas'=>$reserva ]);
    }
}
