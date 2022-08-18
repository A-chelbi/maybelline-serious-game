<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\GameService;

class GameOneController extends AbstractController
{

    /**
     * @Route({
     *     "fr": "/jeux/apprenez-a-reperer-les-signes/intro",
     * }, name="game_one_intro")
     */
    public function intro(GameService $gameService): Response 
    {
        $accessRoute = $gameService->gameManager('game_one_intro');

        if ($accessRoute) return $accessRoute;
        
        $gameService->updateGame('gameIntro1');

        return $this->render('game_one/intro.html.twig', [
            'controllerName' => 'GameOneController:intro',
        ]);
    }

    /**
     * @Route({
     *     "fr": "/jeux/apprenez-a-reperer-les-signes",
     * }, name="game_one_game")
     */
    public function game(GameService $gameService): Response
    {
        $accessRoute = $gameService->gameManager('game_one_game');

        if ($accessRoute) return $accessRoute;
       
        return $this->render('game_one/game.html.twig', [
            'controllerName' => 'GameOneController:game',
        ]);
    }

    /**
     * @Route({
     *     "fr": "/jeux/apprenez-a-reperer-les-signes/success",
     * }, name="game_one_success")
     */
    public function success(GameService $gameService, Request $request): Response
    {
        $previousRoute = $this->getPreviousRouteName($request);

        if ($previousRoute === 'game_one_game') {
            $gameService->updateGame('game1');

            return $this->render('game_one/success.html.twig', [
                'controllerName' => 'GameOneController:succes',
            ]);
        } else {
            return $this->redirectToRoute($previousRoute);
        }

       
    }

    /**
     * @Route({
     *     "fr": "/jeux/apprenez-a-reperer-les-signes/article",
     * }, name="game_one_article")
     */
    public function article(): Response
    {
        return $this->render('game_one/article.html.twig', [
            'controllerName' => 'GameOneController:article',
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
