<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\GameService;

class GameController extends AbstractController
{
    /**
    * @Route({
    *     "fr": "/jeux/intro",
     * }, name="game_intro")
     */
    public function index(GameService $gameService): Response
    {
        $gameService->updateGame('intro');

        return $this->render('game/intro.html.twig', [
            'controllerName' => 'GameController',
        ]);
    }
}
