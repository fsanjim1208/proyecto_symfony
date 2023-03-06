<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Entity\Festivo;
use App\Entity\Evento;
use App\Entity\Tramo;
use App\Entity\Participa;
use App\Entity\Presentacion;

class DashboardController extends AbstractDashboardController
{
    // #[IsGranted("ROLE_ADMIN")]
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        return $this->render('Admin/admin.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Proyecto Symfony');
    }

    public function configureMenuItems(): iterable
    {
        // yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        // // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);

        return [
            MenuItem::linkToRoute('Salir', 'fa fa-mail-reply', 'app_home'),
            MenuItem::linkToDashboard('home', 'fa fa-home'),
            MenuItem::linkToLogout('Logout', 'fa fa-power-off'),
            MenuItem::subMenu('Usuarios', 'fa fa-group')->setSubItems([
                MenuItem::linkToCrud('Nuevo','fa fa-plus-square', User::class) ->setAction('new'),
                MenuItem::linkToCrud('Listado','fa fa-edit', User::class),
            ]),
            // MenuItem::subMenu('Festivos', 'fa fa-calendar')->setSubItems([
            //     MenuItem::linkToCrud('Nuevo','fa fa-plus-square', Festivo::class) ->setAction('new'),
            //     MenuItem::linkToCrud('Listado','fa fa-edit', Festivo::class),
            // ]),
            MenuItem::subMenu('Eventos', 'fa fa-bell')->setSubItems([
                MenuItem::linkToCrud('Nuevo','fa fa-plus-square', Evento::class) ->setAction('new'),
                MenuItem::linkToCrud('Listado','fa fa-edit', Evento::class),

            ]),
            // MenuItem::subMenu('Tramos', 'fa fa-clock-o')->setSubItems([
            //     MenuItem::linkToCrud('Nuevo','fa fa-plus-square', Tramo::class) ->setAction('new'),
            //     MenuItem::linkToCrud('Listado','fa fa-edit', Tramo::class),
            // ]),
            // MenuItem::subMenu('Participaciones')->setSubItems([
            //     MenuItem::linkToCrud('Nuevo','fa fa-plus-square', Participa::class) ->setAction('new'),
            //     MenuItem::linkToCrud('Listado','fa fa-edit', Participa::class),
            // ]),
            // MenuItem::subMenu('Presentaciones')->setSubItems([
            //     MenuItem::linkToCrud('Nuevo','fa fa-plus-square', Presentacion::class) ->setAction('new'),
            //     MenuItem::linkToCrud('Listado','fa fa-edit', Presentacion::class),
            // ]),
           
        ];
    }
}
