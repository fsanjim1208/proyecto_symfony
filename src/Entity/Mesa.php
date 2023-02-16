<?php

namespace App\Entity;

use App\Repository\MesaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MesaRepository::class)]
class Mesa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $Ancho = null;

    #[ORM\Column]
    private ?int $Alto = null;

    #[ORM\Column]
    private ?int $X = null;

    #[ORM\Column]
    private ?int $Y = null;

    #[ORM\OneToMany(mappedBy: 'mesa', targetEntity: Reserva::class)]
    private Collection $reserva;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $Imagen = null;

    #[ORM\OneToMany(mappedBy: 'mesa', targetEntity: Disposicion::class)]
    private Collection $disposiciones;

    public function __construct()
    {
        $this->reserva = new ArrayCollection();
        $this->disposiciones = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAncho(): ?int
    {
        return $this->Ancho;
    }

    public function setAncho(int $Ancho): self
    {
        $this->Ancho = $Ancho;

        return $this;
    }

    public function getAlto(): ?int
    {
        return $this->Alto;
    }

    public function setAlto(int $Alto): self
    {
        $this->Alto = $Alto;

        return $this;
    }

    public function getX(): ?int
    {
        return $this->X;
    }

    public function setX(int $X): self
    {
        $this->X = $X;

        return $this;
    }

    public function getY(): ?int
    {
        return $this->Y;
    }

    public function setY(int $Y): self
    {
        $this->Y = $Y;

        return $this;
    }

    /**
     * @return Collection<int, Reserva>
     */
    public function getReserva(): Collection
    {
        return $this->reserva;
    }

    public function addReserva(Reserva $reserva): self
    {
        if (!$this->reserva->contains($reserva)) {
            $this->reserva->add($reserva);
            $reserva->setMesa($this);
        }

        return $this;
    }

    public function removeReserva(Reserva $reserva): self
    {
        if ($this->reserva->removeElement($reserva)) {
            // set the owning side to null (unless already changed)
            if ($reserva->getMesa() === $this) {
                $reserva->setMesa(null);
            }
        }

        return $this;
    }

    public function getImagen(): ?string
    {
        return $this->Imagen;
    }

    public function setImagen(?string $Imagen): self
    {
        $this->Imagen = $Imagen;

        return $this;
    }

    /**
     * @return Collection<int, Disposicion>
     */
    public function getDisposiciones(): Collection
    {
        return $this->disposiciones;
    }

    public function addDisposicione(Disposicion $disposicione): self
    {
        if (!$this->disposiciones->contains($disposicione)) {
            $this->disposiciones->add($disposicione);
            $disposicione->setMesa($this);
        }

        return $this;
    }

    public function removeDisposicione(Disposicion $disposicione): self
    {
        if ($this->disposiciones->removeElement($disposicione)) {
            // set the owning side to null (unless already changed)
            if ($disposicione->getMesa() === $this) {
                $disposicione->setMesa(null);
            }
        }

        return $this;
    }
}
