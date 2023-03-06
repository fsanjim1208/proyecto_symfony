<?php

namespace App\Form;

use App\Entity\Evento;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\FileType;  
use Symfony\Component\Validator\Constraints\File; 
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Symfony\Component\Form\Extension\Core\Type\DateType;

class EditEventoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('Nombre',TextType::class,[
                'label'=>"Nombre",
                'required' => false,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor el nombre no puede estar vacio',
                    ]),
                ],
            ])
            ->add('Descripcion',TextareaType::class,[
                'data_class' => null,
                'required' => false,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor la descripcion no puede estar vacia',
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
            ->add('fecha', DateType::class, [
                'widget' => 'single_text',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor introduzca una fecha valida',
                    ]),
                ],
                ])
            ->add('save', SubmitType::class, ['label' => 'Editar Juego'])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Evento::class,
        ]);
    }
}
