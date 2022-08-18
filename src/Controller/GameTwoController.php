<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\GameService;

class GameTwoController extends AbstractController
{

    /**
     * @Route({
     *     "fr": "/jeux/choisir-les-mots/intro",
     * }, name="game_two_intro")
     */
    public function intro(GameService $gameService): Response 
    {
        $accessRoute = $gameService->gameManager('game_two_intro');

        if ($accessRoute) return $accessRoute;
        
        $gameService->updateGame('gameIntro2');

        return $this->render('game_two/intro.html.twig', [
            'controllerName' => 'GameTwoController:intro',
        ]);
    }

    /**
     * @Route({
     *     "fr": "/jeux/choisir-les-mots",
     * }, name="game_two_game")
     */
    public function game(GameService $gameService): Response
    {
        $accessRoute = $gameService->gameManager('game_two_game');

        if ($accessRoute) return $accessRoute;
       
        return $this->render('game_two/game.html.twig', [
            'controllerName' => 'GameTwoController:game',
        ]);
    }

    /**
     * @Route({
     *     "fr": "/jeux/choisir-les-mots/success",
     * }, name="game_two_success")
     */
    public function success(GameService $gameService, Request $request): Response
    {
        $previousRoute = $this->getPreviousRouteName($request);

        if ($previousRoute === 'game_two_game') {
            $gameService->updateGame('game2');

            return $this->render('game_two/success.html.twig', [
                'controllerName' => 'GameTwoController:succes',
            ]);
        } else {
            return $this->redirectToRoute($previousRoute);
        }

       
    }

    /**
     * @Route({
     *     "fr": "/jeux/choisir-les-mots/article",
     * }, name="game_two_article")
     */
    public function article(): Response
    {
        return $this->render('game_two/article.html.twig', [
            'controllerName' => 'GameTwoController:article',
        ]);
    }

    private function getPreviousRouteName(Request $request) 
    {
        $referer = $request->headers->get('referer');
        $referer = str_replace('http://' . $request->headers->get('host'), '', $referer);
        $referer = str_replace('https://' . $request->headers->get('host'), '', $referer);

        return $this->get('router')->getMatcher()->match($referer)['_route'];
    }
}
