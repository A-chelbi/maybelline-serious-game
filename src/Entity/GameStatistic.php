<?php

namespace App\Entity;

use App\CommonInterface\CreatedAtInterface;
use App\CommonTrait\CreatedAtTrait;
use App\Repository\GameStatisticRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GameStatisticRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class GameStatistic implements CreatedAtInterface
{
    use CreatedAtTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $game;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?string
    {
        return $this->game;
    }

    public function setGame(string $game): self
    {
        $this->game = $game;

        return $this;
    }
}
