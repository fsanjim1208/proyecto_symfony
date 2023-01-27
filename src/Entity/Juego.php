<?php

namespace App\Entity;

use App\Repository\JuegoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: JuegoRepository::class)]
class Juego
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
    private ?int $jugadores_min = null;

    #[ORM\Column]
    private ?int $jugadores_max = null;

    #[ORM\Column(length: 50)]
    private ?string $nombre = null;

    #[ORM\Column(length: 150)]
    private ?string $img = null;

    #[ORM\Column(length: 50)]
    private ?string $editorial = null;

    #[ORM\OneToMany(mappedBy: 'juego', targetEntity: Reserva::class)]
    private Collection $reserva;

    #[ORM\OneToMany(mappedBy: 'juego', targetEntity: Presentacion::class)]
    private Collection $presentacion;

    public function __construct()
    {
        $this->reserva = new ArrayCollection();
        $this->presentacion = new ArrayCollection();
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

    public function getJugadoresMin(): ?int
    {
        return $this->jugadores_min;
    }

    public function setJugadoresMin(int $jugadores_min): self
    {
        $this->jugadores_min = $jugadores_min;

        return $this;
    }

    public function getJugadoresMax(): ?int
    {
        return $this->jugadores_max;
    }

    public function setJugadoresMax(int $jugadores_max): self
    {
        $this->jugadores_max = $jugadores_max;

        return $this;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

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

    public function getEditorial(): ?string
    {
        return $this->editorial;
    }

    public function setEditorial(string $editorial): self
    {
        $this->editorial = $editorial;

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
            $reserva->setJuego($this);
        }

        return $this;
    }

    public function removeReserva(Reserva $reserva): self
    {
        if ($this->reserva->removeElement($reserva)) {
            // set the owning side to null (unless already changed)
            if ($reserva->getJuego() === $this) {
                $reserva->setJuego(null);
            }
        }

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
            $presentacion->setJuego($this);
        }

        return $this;
    }

    public function removePresentacion(Presentacion $presentacion): self
    {
        if ($this->presentacion->removeElement($presentacion)) {
            // set the owning side to null (unless already changed)
            if ($presentacion->getJuego() === $this) {
                $presentacion->setJuego(null);
            }
        }

        return $this;
    }
}
