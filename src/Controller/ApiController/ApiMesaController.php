<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Mesa;
use Doctrine\Persistence\ManagerRegistry;
 

#[Route('/api',name:"api_")]
class ApiMesaController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}



    #[Route('/mesa',name:"mesa_index", methods:"GET")]
    public function index(): Response
    {
        $mesas = $this->doctrine
                         ->getRepository(Mesa::class)
                         ->findAll();
 
        $arrayMesas = [];

        if(!$mesas){
            return $this->json("No hay mesas", 404);
        }
        
        foreach ($mesas as $mesa) {
            $arrayMesas[] = [
                'id' => $mesa->getId(),
                'ancho' => $mesa->getAncho(),
                'alto' => $mesa->getAlto(),
                'x' => $mesa->getX(),
                'y' => $mesa->getY(),
                'imagen' => $mesa->getImagen(),
            ];
        }
 
 
        return $this->json($arrayMesas);
    }

    #[Route('/mesa/{id}',name:"mesas_show", methods:"GET")]
    public function show(int $id): Response
    {
        $mesa = $this->doctrine
            ->getRepository(Mesa::class)
            ->find($id);
 
        if (!$mesa) {
 
            return $this->json(['No hay mesas por esa id: ' . $id, 'codigo:404 '], 404);
        }
 
        $arrayMesas[] = [
            'id' => $mesa->getId(),
            'ancho' => $mesa->getAncho(),
            'alto' => $mesa->getAlto(),
            'x' => $mesa->getX(),
            'y' => $mesa->getY(),
            'imagen' => $mesa->getImagen(),

        ];
         
        return $this->json($arrayMesas);
    }


    #[Route('/mesa/{id}',name:"mesa_show2", methods:"PUT")]
    public function edit(Request $request, int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $mesa = $entityManager->getRepository(Mesa::class)->find($id);
        //var_dump($producto);
        if (!$mesa) {
            return $this->json(['No hay mesas por esa id: ' . $id, 'codigo:404 '], 404);
        }
 
        $mesa->setAncho($request->request->get('ancho'));
        $mesa->setAlto($request->request->get('alto'));
        $mesa->setX($request->request->get('x'));
        $mesa->setY($request->request->get('y'));
        $mesa->setImagen($request->request->get('imagen'));
        
        $entityManager->persist($mesa);
        $entityManager->flush();

        $arrayMesas[] = [
            'id' => $mesa->getId(),
            'ancho' => $mesa->getAncho(),
            'alto' => $mesa->getAlto(),
            'x' => $mesa->getX(),
            'y' => $mesa->getY(),
            'imagen' => $mesa->getImagen(),
        ];
         
        return $this->json(['Guardada la mesa con id: '. $id ,'codigo: 201',$arrayMesas],201);
    }
 


    #[Route('/mesa',name:"mesa_new", methods:"POST")]
    public function new(Request $request): Response
    {
        $entityManager = $this->doctrine->getManager();
 
        $mesa = new Mesa();
        $mesa->setAncho($request->request->get('ancho'));
        $mesa->setAlto($request->request->get('alto'));
        $mesa->setX($request->request->get('x'));
        $mesa->setY($request->request->get('y'));
        $mesa->setImagen($request->request->get('imagen'));
 
        $entityManager->persist($mesa);
        $entityManager->flush();
 
        return $this->json(['Creada la nueva mesa con id ' . $mesa->getId(), 'codigo: 201'], 201);
    }

    #[Route('/mesa/{id}',name:"mesa_delete", methods:"DELETE")]
    public function delete(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $mesa = $entityManager->getRepository(Mesa::class)->find($id);
 
        if (!$mesa) {
            return $this->json(['No hay mesas por esa id: ' . $id, 'codigo: 404 '], 404);
        }
 
        $entityManager->remove($mesa);
        $entityManager->flush();
 
        return $this->json(['Borrada correctamente la mesa con id ' . $id,'codigo: 200']);
    }
 
       
 
 
 
}