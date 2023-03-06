<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Evento;
use Doctrine\Persistence\ManagerRegistry;
 

#[Route('/api',name:"api_")]
class ApiEventoController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}



    #[Route('/evento',name:"evento_all", methods:"GET")]
    public function index(): Response
    {
        $eventos = $this->doctrine
                         ->getRepository(Evento::class)
                         ->findAll();
 
        $arrayEventos = [];

        if(!$eventos){
            return $this->json("No hay eventos", 404);
        }
        
        foreach ($eventos as $evento) {
            $arrayEventos[] = [
                'id' => $evento->getId(),
                'nombre' => $evento->getNombre(),
                'descripcion' => $evento->getDescripcion(),
                'imagen' => $evento->getImg(),
            ];
        }

        return $this->json($arrayEventos);
    } 

    #[Route('/evento/{id}',name:"evento_show", methods:"GET")]
    public function show_evento($id): Response
    {
        $evento = $this->doctrine
                         ->getRepository(Evento::class)
                         ->findOneById($id);
 

        if(!$evento){
            return $this->json("No hay eventos", 404);
        }
        
        
        $arrayEventos = [
            'id' => $evento->getId(),
            'nombre' => $evento->getNombre(),
            'descripcion' => $evento->getDescripcion(),
            'imagen' => $evento->getImg(),
        ];
        

        return $this->json($arrayEventos);
    } 



}