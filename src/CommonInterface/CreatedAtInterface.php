<?php

namespace App\CommonInterface;

interface CreatedAtInterface {
    public function getCreatedAt(): ?\DateTime;

    public function setCreatedAt(): self;
}
