<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use App\Service\CookieService;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(TranslatorInterface $translator, CookieService $cookieService): Response
    {
        $valueBtnNavBar = $translator->trans('Commencer');
        $linkBtnNavBar = 'game_intro';
        $valueBtnGame1 = $translator->trans('Commencer');
        $valueBtnGame2 = $translator->trans('Commencer');
        $valueBtnGame3 = $translator->trans('Commencer');
        $gameCookie = $cookieService->getCookie('game');

        if ($gameCookie) {
            $dataGame = json_decode($gameCookie, true);
            $introGame2 = $dataGame['gameIntro2'];
            $introGame3 = $dataGame['gameIntro3'];

            if ($dataGame['game1']) {
                $valueBtnGame1 = $translator->trans('Rejouer');
                $valueBtnNavBar = $translator->trans('Continuer');
                $linkBtnNavBar = 'game_one_intro';
            }

            if ($dataGame['game2']) {
                $valueBtnGame2 = $translator->trans('Rejouer');
                $valueBtnNavBar = $translator->trans('Continuer');
                $linkBtnNavBar = 'game_two_intro';
            } 

            if ($dataGame['game3']) {
                $valueBtnGame3 = $translator->trans('Rejouer');
                $valueBtnNavBar = $translator->trans('Continuer');
                $linkBtnNavBar = 'game_three_intro';
            }

            if ($dataGame['game1'] && $dataGame['game2'] && $dataGame['game3']) {
                $valueBtnNavBar = $translator->trans('Rejouer');
            }
        }

        return $this->render('home/index.html.twig', [
            'valueBtnGame1' => $valueBtnGame1,
            'valueBtnGame2' => $valueBtnGame2,
            'valueBtnGame3' => $valueBtnGame3,
            'introGame2' => $introGame2 ?? null,
            'introGame3' => $introGame3 ?? null,
            'valueBtnNavBar' => $valueBtnNavBar,
            'linkBtnNavBar' => $linkBtnNavBar

        ]);
    }

    /**
     * @Route({
     *     "fr": "/mentions-legales",
     * }, name="legals")
     */
    public function legals(): Response
    {
        return $this->render('pages/legals.html.twig', [
            'controllerName' => 'HomeController',
        ]);
    }

    /**
     * @Route({
     *     "fr": "/cgu",
     * }, name="terms_of_service")
     */
    public function termsOfService(): Response
    {
        return $this->render('pages/terms_of_service.html.twig', [
            'controllerName' => 'HomeController',
        ]);
    }
}
