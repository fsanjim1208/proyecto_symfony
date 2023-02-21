<?php

namespace App\Form;

use App\Entity\Juego;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\FileType;  
use Symfony\Component\Validator\Constraints\File; 

class JuegoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nombre')
            ->add('editorial')
            ->add('ancho')
            ->add('alto')
            ->add('jugadores_min')
            ->add('jugadores_max')
            ->add('img', FileType::class, [ 
                'label' => false,
                'required' => false,
                'data_class' => null,
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                        ],
                        'mimeTypesMessage' => 'Seleccione una imagen valida',
                    ]),
                ],
            ])
            ->add('save', SubmitType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Juego::class,
        ]);
    }
}
