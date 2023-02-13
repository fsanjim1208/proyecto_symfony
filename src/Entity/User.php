<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 50)]
    private ?string $Nombre = null;

    #[ORM\Column(length: 50)]
    private ?string $Apellido1 = null;

    #[ORM\Column(length: 50)]
    private ?string $Apellido2 = null;

    #[ORM\Column]
    private ?int $id_telegram = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Participa::class)]
    private Collection $participa;

    public function __construct()
    {
        $this->participa = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);

        
    }

    public function getAdmin(): bool
    {
        // $roles = $this->roles;
        // // guarantee every user at least has ROLE_USER
        // $roles[] = 'ROLE_USER';

        // return array_unique($roles);

        return in_array('ROLE_ADMIN', $this->roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getApellido1(): ?string
    {
        return $this->Apellido1;
    }

    public function setApellido1(string $Apellido1): self
    {
        $this->Apellido1 = $Apellido1;

        return $this;
    }

    public function getApellido2(): ?string
    {
        return $this->Apellido2;
    }

    public function setApellido2(string $Apellido2): self
    {
        $this->Apellido2 = $Apellido2;

        return $this;
    }

    public function getIdTelegram(): ?int
    {
        return $this->id_telegram;
    }

    public function setIdTelegram(int $id_telegram): self
    {
        $this->id_telegram = $id_telegram;

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
            $participa->setUser($this);
        }

        return $this;
    }

    public function removeParticipa(Participa $participa): self
    {
        if ($this->participa->removeElement($participa)) {
            // set the owning side to null (unless already changed)
            if ($participa->getUser() === $this) {
                $participa->setUser(null);
            }
        }

        return $this;
    }
}
