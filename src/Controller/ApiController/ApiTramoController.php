<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Tramo;
use Doctrine\Persistence\ManagerRegistry;
 

#[Route('/api',name:"api_")]
class ApiTramoController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}



    #[Route('/tramo/{inicio}',name:"show_one_tramo", methods:"Get")]
    public function index(Request $request,$inicio): Response
    {

        $entityManager = $this->doctrine->getManager();


        $tramo = $this->doctrine
                        ->getRepository(Tramo::class)
                        ->findOneByIncio($inicio);
                        // ->findByFechaAndIdMesa("18-02-2023",5);
        // dd($disposicion);
        $tramoArray = [];

        if(!$tramo){
            return $this->json("No hay tramo", 404);
        }
    
        $tramoArray = [
            'id' => $tramo->getId(),
            'incio' => $tramo->getIncio(),
            'fin' => $tramo->getFin(),
            
        ];
        
        
        return $this->json($tramoArray);
    }

    
 
}