<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Disposicion;
use App\Entity\Juego;
use App\Entity\Mesa;
use App\Entity\Tramo;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
 

#[Route('/api',name:"api_")]
class ApiDisposicionController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}



    #[Route('/disposicion2/{id}/{fecha}',name:"disposicion_index", methods:"PUT")]
    public function index(Request $request,$id, $fecha): Response
    {

        $entityManager = $this->doctrine->getManager();
        
        // $disposicion = $this->doctrine
        //                 ->getRepository(Disposicion::class)
        //                 ->findByFechaAndIdMesa("18-02-2023",5);
        // dd($disposiciones);

        //dd($id);

        $disposicion = $this->doctrine
                        ->getRepository(Disposicion::class)
                        ->findByFechaAndIdMesa($fecha, $id);
                        // ->findByFechaAndIdMesa("18-02-2023",5);
        // dd($disposicion);
        $disposicionesArray = [];

        if(!$disposicion){
            return $this->json("No hay disposiciones", 404);
        }

        $disposicion->setX($request->request->get('X'));
        $disposicion->setY($request->request->get('Y'));
      
        $entityManager->persist($disposicion);
        $entityManager->flush();

    
        $arrayReservas[] = [
            'id' => $disposicion->getId(),
            'fecha' => $disposicion->getFecha(),
            'idMesa' => $disposicion->getMesa()->getId(),
            'X' => $disposicion->getX(),
            'Y' => $disposicion->getY(),
            
        ];
        
        
        return $this->json($arrayReservas);
    }

    #[Route('/disposicion/{fecha}',name:"disposicion_show", methods:"GET")]
    public function show_reserva(String $fecha): Response
    {
        $disposiciones = $this->doctrine
                        ->getRepository(Disposicion::class)
                        ->findByFecha($fecha);
 
        

        if(!$disposiciones){
            return $this->json("No hay disposiciones", 404);
        }
        
        $disposicionesArray=[];

        
        foreach ($disposiciones as $disposicion) {
            $disposicionesArray[] = [
                'id' => $disposicion->getId(),
                'fecha' => $disposicion->getFecha(),
                'idMesa' => $disposicion->getMesa()->getId(),
                'X' => $disposicion->getX(),
                'Y' => $disposicion->getY(),
                
            ];
        }
        
        
        return $this->json($disposicionesArray);
    }

    #[Route('/disposicion',name:"disposicion_show_all", methods:"GET")]
    public function show_all_disposicion(): Response
    {
        $disposiciones = $this->doctrine
                        ->getRepository(Disposicion::class)
                        ->findAll();
 
        

        if(!$disposiciones){
            return $this->json("No hay disposiciones", 404);
        }
        
        $disposicionesArray=[];

        
        foreach ($disposiciones as $disposicion) {
            $disposicionesArray[] = [
                'id' => $disposicion->getId(),
                'fecha' => $disposicion->getFecha(),
                'idMesa' => $disposicion->getMesa()->getId(),
                'X' => $disposicion->getX(),
                'Y' => $disposicion->getY(),
                
            ];
        }
        
        
        return $this->json($disposicionesArray);
    }

    #[Route('/disposicion/{id}',name:"disposicion_update", methods:"PUT")]
    public function edit(Request $request, int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $disposicion = $entityManager->getRepository(Disposicion::class)->find($id);
        //var_dump($producto);
        if (!$disposicion) {
            return $this->json('No se encuentran festivos por esa id:  ' . $id, 404);
        }
 
        $disposicion->setX($request->request->get('X'));
        $disposicion->setY($request->request->get('Y'));
      
        $entityManager->persist($disposicion);
        $entityManager->flush();

        $arrayDisposicion[] = [
            'id' => $disposicion->getId(),
            'mesa' => $disposicion->getMesa(),
            'fecha' => $disposicion->getFecha(),
            'x' => $disposicion->getX(),
            'y' => $disposicion->getY(),
        ];
         
        return $this->json($arrayDisposicion);
    }

    #[Route('/disposicion',name:"disposicion_new", methods:"POST")]
    public function new(Request $request): Response
    {
        $entityManager = $this->doctrine->getManager();
        
        $mesa = $this->doctrine
        ->getRepository(Mesa::class)
        ->findOneById(explode("_",$request->request->get('mesa'))[1]);
        //->findByName("Monopoly");

        // $dia=explode("/",$request->request->get('fecha'))[0];
        // $mes=explode("/",$request->request->get('fecha'))[1];
        // $anio=explode("/",$request->request->get('fecha'))[2];

        // // $dia=explode("/","12/12/12")[0];
        // // $mes=explode("/","12/12/12")[1];
        // // $anio=explode("/","12/12/12")[2];

        // $fecha= $anio."-".$mes."-".$dia;

        

        $disposicion = new Disposicion();
        $disposicion->setFecha($request->request->get('fecha'));
        $disposicion->setMesa($mesa);
        $disposicion->setX($request->request->get('X'));
        $disposicion->setY($request->request->get('Y'));


        $entityManager->persist($disposicion);
        $entityManager->flush();
        // dd($reserva);
        return $this->json('Creada la disposicion con id ' . $disposicion->getId());
    }


    // #[Route('/festivo/{id}',name:"festivo_show2", methods:"PUT")]
    // public function edit(Request $request, int $id): Response
    // {
    //     $entityManager = $this->doctrine->getManager();
    //     $festivo = $entityManager->getRepository(Festivo::class)->find($id);
    //     //var_dump($producto);
    //     if (!$festivo) {
    //         return $this->json('No se encuentran festivos por esa id:  ' . $id, 404);
    //     }
 
    //     $festivo->setAncho($request->request->get('ancho'));
    //     $festivo->setAlto($request->request->get('alto'));
    //     $festivo->setX($request->request->get('x'));
    //     $festivo->setY($request->request->get('y'));
    //     $festivo->setImagen($request->request->get('imagen'));
        
    //     $entityManager->persist($festivo);
    //     $entityManager->flush();

    //     $arrayfestivos[] = [
    //         'id' => $festivo->getId(),
    //         'ancho' => $festivo->getAncho(),
    //         'alto' => $festivo->getAlto(),
    //         'x' => $festivo->getX(),
    //         'y' => $festivo->getY(),
    //         'imagen' => $festivo->getImagen(),
    //     ];
         
    //     return $this->json($arrayfestivos);
    // }
 


    // 

    #[Route('/disposicion/{id}',name:"disposicion_delete", methods:"DELETE")]
    public function delete(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $disposicion = $entityManager->getRepository(Disposicion::class)->find($id);
 
        if (!$disposicion) {
            return $this->json('No project found for id' . $id, 404);
        }
 
        $entityManager->remove($disposicion);
        $entityManager->flush();
 
        return $this->json('disposicion eliminada correctamente with id ' . $id);
    }
 
       
 
 
 
}