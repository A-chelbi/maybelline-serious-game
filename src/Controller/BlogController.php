<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\GameService;

class BlogController extends AbstractController
{
    /**
     * @Route({
     *     "fr": "/blogue"
     * }, name="blog")
     */
    public function index(GameService $gameService): Response
    { 
        [$valueBtnNavBar, $linkBtnNavBar] = $gameService->getValueAndLinkBtnNavBar();

        return $this->render('blog/index.html.twig', [
            'valueBtnNavBar' => $valueBtnNavBar,
            'linkBtnNavBar' => $linkBtnNavBar
        ]);
    }

    /**
     * @Route({
     *     "fr": "/blogue/Constat"
     * }, name="blog_general")
     */
    public function blogGeneral(GameService $gameService): Response
    {
        [$valueBtnNavBar, $linkBtnNavBar] = $gameService->getValueAndLinkBtnNavBar();

        return $this->render('blog/blog_general.html.twig', [
            'valueBtnNavBar' => $valueBtnNavBar,
            'linkBtnNavBar' => $linkBtnNavBar
        ]);
    }

    /**
     * @Route({
     *     "fr": "/blogue/reperer-les-signes"
     * }, name="blog_one")
     */
    public function blogOne(GameService $gameService): Response
    {
        [$valueBtnNavBar, $linkBtnNavBar] = $gameService->getValueAndLinkBtnNavBar();

        return $this->render('blog/blog_one.html.twig', [
            'valueBtnNavBar' => $valueBtnNavBar,
            'linkBtnNavBar' => $linkBtnNavBar
        ]);
    }

    /**
     * @Route({
     *     "fr": "/blogue/choisir-les-mots"
     * }, name="blog_two")
     */
    public function blogTwo(GameService $gameService): Response
    {
        [$valueBtnNavBar, $linkBtnNavBar] = $gameService->getValueAndLinkBtnNavBar();

        return $this->render('blog/blog_two.html.twig', [
            'valueBtnNavBar' => $valueBtnNavBar,
            'linkBtnNavBar' => $linkBtnNavBar
        ]);
    }

    /**
     * @Route({
     *     "fr": "/blogue/savoir-ou-trouver-de-l-aide"
     * }, name="blog_three")
     */
    public function blogThree(GameService $gameService): Response
    {
        [$valueBtnNavBar, $linkBtnNavBar] = $gameService->getValueAndLinkBtnNavBar();

        return $this->render('blog/blog_three.html.twig', [
            'valueBtnNavBar' => $valueBtnNavBar,
            'linkBtnNavBar' => $linkBtnNavBar
        ]);
    }


}
