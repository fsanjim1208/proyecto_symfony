<?php

namespace App\Controller\Admin;

use App\Entity\Presentacion;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PresentacionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Presentacion::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
