<?php

namespace App\Form;

use App\Entity\Juego;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\FileType;  
use Symfony\Component\Validator\Constraints\File; 
use Symfony\Component\Form\Extension\Core\Type\IntegerType;  
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Symfony\Component\Validator\Constraints\Positive;

class JuegoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('nombre',TextType::class,[
            'label'=>"Nombre",
            'constraints' => [
                new NotBlank([
                    'message' => 'Por favor el nombre no puede estar vacio',
                ]),
            ],
        ])
            ->add('editorial',TextType::class,[
                'label'=>"Nombre",
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor la editorial no puede estar vacia',
                    ]),
                ],
            ])
            ->add('ancho')
            ->add('alto')
            ->add('jugadores_min',IntegerType::class,[
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor introduzca un numero de jugadores',
                    ]),
                    new Positive([
                        'message' => 'El valor debe ser positivo',
                    ]),
                ],
            ])
            ->add('jugadores_max',IntegerType::class,[
                'constraints' => [
                    new Positive([
                        'message' => 'El valor debe ser positivo',
                    ]),
                    new NotBlank([
                        'message' => 'Por favor introduzca un numero de jugadores',
                    ]),

                ],
            ])
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
