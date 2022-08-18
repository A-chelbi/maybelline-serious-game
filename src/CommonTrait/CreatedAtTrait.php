<?php

namespace App\CommonTrait;

trait CreatedAtTrait {
    /**
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;    
    }

    /**
     * @ORM\PrePersist
    */
    public function setCreatedAt(): self
    {
        $this->createdAt = new \DateTime('now');

        return $this;
    }
}
