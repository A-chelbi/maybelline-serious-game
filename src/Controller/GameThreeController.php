<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\GameService;

class GameThreeController extends AbstractController
{

    /**
     * @Route({
     *     "fr": "/jeux/trouver-de-l-aide/intro",
     * }, name="game_three_intro")
     */
    public function intro(GameService $gameService): Response 
    {
        $accessRoute = $gameService->gameManager('game_three_intro');

        if ($accessRoute) return $accessRoute;
        
        $gameService->updateGame('gameIntro3');

        return $this->render('game_three/intro.html.twig', [
            'controllerName' => 'GameThreeController:intro',
        ]);
    }

    /**
     * @Route({
     *     "fr": "/jeux/trouver-de-l-aide",
     * }, name="game_three_game")
     */
    public function game(GameService $gameService): Response
    {
        $accessRoute = $gameService->gameManager('game_three_game');

        if ($accessRoute) return $accessRoute;
       
        return $this->render('game_three/game.html.twig', [
            'controllerName' => 'GameThreeController:game',
        ]);
    }

    /**
     * @Route({
     *     "fr": "/jeux/trouver-de-l-aide/single-success/{id}",
     * }, name="game_three_single_success")
     */
    public function singleSuccess(GameService $gameService, Request $request, $id): Response
    {
        $previousRoute = $this->getPreviousRouteName($request);

        if ($previousRoute === 'game_three_game') {
            $gameService->updateGame('game3');

            return $this->render('game_three/single_success.html.twig', [
                'controllerName' => 'GameThreeController:singleSuccess',
            ]);
        } else {
            return $this->redirectToRoute($previousRoute);
        }
    }

    /**
     * @Route({
     *     "fr": "/jeux/trouver-de-l-aide/success",
     * }, name="game_three_success")
     */
    public function success(GameService $gameService, Request $request): Response
    {
        $previousRoute = $this->getPreviousRouteName($request);
        
        if ($previousRoute === 'game_three_single_success') {
            $gameService->updateGame('game3');

            return $this->render('game_three/success.html.twig', [
                'controllerName' => 'GameThreeController:succes',
            ]);
        } else {
            return $this->redirectToRoute($previousRoute);
        }

       
    }

    /**
     * @Route({
     *     "fr": "/jeux/trouver-de-l-aide/article",
     * }, name="game_three_article")
     */
    public function article(): Response
    {
        return $this->render('game_three/article.html.twig', [
            'controllerName' => 'GameThreeController:article',
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
