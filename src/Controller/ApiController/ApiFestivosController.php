<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Festivo;
use Doctrine\Persistence\ManagerRegistry;
 

#[Route('/api',name:"api_")]
class ApiFestivosController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}



    #[Route('/festivo',name:"festivo_index", methods:"GET")]
    public function index(): Response
    {
        $festivos = $this->doctrine
                         ->getRepository(Festivo::class)
                         ->findAll();
 
        $arrayFestivo = [];

        if(!$festivos){
            return $this->json("No hay festivos", 404);
        }
        
        foreach ($festivos as $festivo) {
            $arrayFestivo[] = [
                'id' => $festivo->getId(),
                'day' => $festivo->getDay(),
                'month' => $festivo->getMonth(),
                'year' => $festivo->getYear(),
                'descripcion' => $festivo->getDescripcion(),
            ];
        }
 
 
        return $this->json($arrayFestivo);
    }

    #[Route('/festivo/{id}',name:"festivo_update", methods:"PUT")]
    public function edit(Request $request, int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $festivo = $entityManager->getRepository(Festivo::class)->find($id);
        //var_dump($producto);
        if (!$festivo) {
            return $this->json('No se encuentran festivos por esa id:  ' . $id, 404);
        }
 
        $festivo->setDay($request->request->get('day'));
        $festivo->setMonth($request->request->get('month'));
        $festivo->setYear($request->request->get('year'));
        $festivo->setDescripcion($request->request->get('descripcion'));
        
        $entityManager->persist($festivo);
        $entityManager->flush();

        $arrayfestivos[] = [
            'id' => $festivo->getId(),
            'day' => $festivo->getDay(),
            'month' => $festivo->getMonth(),
            'year' => $festivo->getYear(),
            'descripcion' => $festivo->getDescripcion(),
        ];
         
        return $this->json($arrayfestivos);
    }

    #[Route('/festivo',name:"festivo_new", methods:"POST")]
    public function new(Request $request): Response
    {
        $entityManager = $this->doctrine->getManager();
 
        $festivo = new festivo();
        $festivo->setDay($request->request->get('day'));
        $festivo->setMonth($request->request->get('month'));
        $festivo->setYear($request->request->get('year'));
        $festivo->setDescripcion($request->request->get('descripcion'));
 
        $entityManager->persist($festivo);
        $entityManager->flush();
 
        return $this->json('Creada el nuevo dia festivo con id ' . $festivo->getId());
    }

    // #[Route('/festivo/{id}',name:"festivos_show", methods:"GET")]
    // public function show(int $id): Response
    // {
    //     $festivo = $this->doctrine
    //         ->getRepository(Festivo::class)
    //         ->find($id);
 
    //     if (!$festivo) {
 
    //         return $this->json('No hay festivos por esa id: ' . $id, 404);
    //     }
 
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

    // #[Route('/festivo/{id}',name:"festivo_delete", methods:"DELETE")]
    // public function delete(int $id): Response
    // {
    //     $entityManager = $this->doctrine->getManager();
    //     $festivo = $entityManager->getRepository(Festivo::class)->find($id);
 
    //     if (!$festivo) {
    //         return $this->json('No project found for id' . $id, 404);
    //     }
 
    //     $entityManager->remove($festivo);
    //     $entityManager->flush();
 
    //     return $this->json('Deleted a project successfully with id ' . $id);
    // }
 
       
 
 
 
}