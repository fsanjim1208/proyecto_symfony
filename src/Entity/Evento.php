<?php

namespace App\Entity;

use App\Repository\EventoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EventoRepository::class)]
class Evento
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $Nombre = null;

    #[ORM\Column(length: 200)]
    private ?string $Descripcion = null;

    #[ORM\Column(length: 150)]
    private ?string $img = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $fecha = null;

    #[ORM\OneToMany(mappedBy: 'evento', targetEntity: Presentacion::class)]
    private Collection $presentacion;

    #[ORM\OneToMany(mappedBy: 'evento', targetEntity: Participa::class)]
    private Collection $participa;

    public function __construct()
    {
        $this->presentacion = new ArrayCollection();
        $this->participa = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->Nombre;
    }

    public function setNombre(string $Nombre): self
    {
        $this->Nombre = $Nombre;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->Descripcion;
    }

    public function setDescripcion(string $Descripcion): self
    {
        $this->Descripcion = $Descripcion;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(string $img): self
    {
        $this->img = $img;

        return $this;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    /**
     * @return Collection<int, Presentacion>
     */
    public function getPresentacion(): Collection
    {
        return $this->presentacion;
    }

    public function addPresentacion(Presentacion $presentacion): self
    {
        if (!$this->presentacion->contains($presentacion)) {
            $this->presentacion->add($presentacion);
            $presentacion->setEvento($this);
        }

        return $this;
    }

    public function removePresentacion(Presentacion $presentacion): self
    {
        if ($this->presentacion->removeElement($presentacion)) {
            // set the owning side to null (unless already changed)
            if ($presentacion->getEvento() === $this) {
                $presentacion->setEvento(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Participa>
     */
    public function getParticipa(): Collection
    {
        return $this->participa;
    }

    public function addParticipa(Participa $participa): self
    {
        if (!$this->participa->contains($participa)) {
            $this->participa->add($participa);
            $participa->setEvento($this);
        }

        return $this;
    }

    public function removeParticipa(Participa $participa): self
    {
        if ($this->participa->removeElement($participa)) {
            // set the owning side to null (unless already changed)
            if ($participa->getEvento() === $this) {
                $participa->setEvento(null);
            }
        }

        return $this;
    }
}
