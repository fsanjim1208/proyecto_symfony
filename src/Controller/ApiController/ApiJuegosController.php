<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Juego;
use Doctrine\Persistence\ManagerRegistry;
 

#[Route('/api',name:"api_")]
class ApiJuegosController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}



    #[Route('/juego',name:"juego_index", methods:"GET")]
    public function index(): Response
    {
        $juegos = $this->doctrine
                         ->getRepository(Juego::class)
                         ->findAll();
 
        $arrayJuegos = [];

        if(!$juegos){
            return $this->json("No hay juegos", 404);
        }
        
        foreach ($juegos as $juego) {
            $arrayJuegos[] = [
                'id' => $juego->getId(),
                'nombre' => $juego->getNombre(),
                'jugadores_min' => $juego->getJugadoresMin(),
                'jugadores_max' => $juego->getJugadoresMax(),
                'imagen' => $juego->getImg(),
                'ancho' => $juego->getAncho(),
                'alto' => $juego->getAlto(),
            ];
        }

        return $this->json($arrayJuegos);
    } 

    #[Route('/juego/{id}',name:"juego_show", methods:"GET")]
    public function show(int $id): Response
    {
        $juego = $this->doctrine
            ->getRepository(Juego::class)
            ->find($id);
 
        if (!$juego) {
 
            return $this->json('No hay juego por esa id: ' . $id, 404);
        }
 
        
        $arrayJuegos = [
            'id' => $juego->getId(),
            'nombre' => $juego->getNombre(),
            'jugadores_min' => $juego->getJugadoresMin(),
            'jugadores_max' => $juego->getJugadoresMax(),
            'imagen' => $juego->getImg(),
            'ancho' => $juego->getAncho(),
            'alto' => $juego->getAlto(),
        ];

        return $this->json($arrayJuegos);
    }
}