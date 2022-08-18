<?php

namespace App\Service;

use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use App\Service\CookieService;
use Symfony\Contracts\Translation\TranslatorInterface;

class GameService 
{
    const GAME_HIERACHIES = [
        'game_intro' => null,
        'game_one_intro' => 'intro',
        'game_one_game' => 'gameIntro1',
        'game_one_success' => 'game1',
        'game_two_intro' => 'game1',
        'game_two_game' => 'gameIntro2',
        'game_two_success' => 'game2',
        'game_three_intro' => 'game2',
        'game_three_game' => 'gameIntro3',
        'game_three_single_success' => 'game3',
        'game_three_success' => 'game3'
    ];

    protected $cookieService;
    protected $router;
    protected $requestStack;
    protected $translator;
    
    public function __construct(
        CookieService $cookieService,
        RouterInterface $router,
        RequestStack $requestStack,
        TranslatorInterface $translator
    ) {
        $this->cookieService = $cookieService;
        $this->router = $router;
        $this->requestStack = $requestStack;
        $this->translator = $translator;
    }

    public function initializeCookie()
    {
        $dataGame = [
            'intro' => false,
            'game1' => false,
            'gameIntro1' => false,
            'game2' => false,
            'gameIntro2' => false,
            'game3' => false,
            'gameIntro3' => false,
        ];

        $this->cookieService->setCookie('game', json_encode($dataGame));

        return $dataGame;
    }

    public function gameManager(string $route)
    {
        $request = $this->requestStack->getCurrentRequest();
        $cookies = $request->cookies;
        
        if (!$cookies->has('game')) {
            $dataGame = $this->initializeCookie();
        } else {
            $dataGame = json_decode($this->cookieService->getCookie('game'), true);
        }
  
        $hasPrerequisite = false;

        if (self::GAME_HIERACHIES[$route]) $hasPrerequisite = $dataGame[self::GAME_HIERACHIES[$route]];

        if ($hasPrerequisite) return;

        $lastRouteName = 'game_intro';

        foreach (self::GAME_HIERACHIES as $routeName => $prerequisite) {
            if ($prerequisite && !$dataGame[$prerequisite]) return new RedirectResponse($this->router->generate($lastRouteName));
            $lastRouteName = $routeName;
        }
    }

    public function updateGame(string $key)
    {
        $request = $this->requestStack->getCurrentRequest();
        $cookies = $request->cookies;
     
        if (!$cookies->has('game')) {
            $dataGame = $this->initializeCookie();
        } else {
            $dataGame = json_decode($this->cookieService->getCookie('game'), true);
        }

        $dataGame[$key] = true;
        $this->cookieService->editCookie('game', json_encode($dataGame));
    }
    
    public function getValueAndLinkBtnNavBar() {
        $valueBtnNavBar = $this->translator->trans('Commencer');
        $linkBtnNavBar = 'game_intro';
        $gameCookie = $this->cookieService->getCookie('game');

        if ($gameCookie) {
            $dataGame = json_decode($gameCookie, true);

            if ($dataGame['game1']) {
                $valueBtnNavBar = $this->translator->trans('Continuer');
                $linkBtnNavBar = 'game_one_intro';
            }

            if ($dataGame['game2']) {
                $valueBtnNavBar = $this->translator->trans('Continuer');
                $linkBtnNavBar = 'game_two_intro';
            }
            
            if ($dataGame['game3']) { 
                $valueBtnNavBar = $this->translator->trans('Continuer');
                $linkBtnNavBar = 'game_three_intro';
            }

            if ($dataGame['game1'] && $dataGame['game2'] && $dataGame['game3']) {
                $valueBtnNavBar = $this->translator->trans('Rejouer');
            }
        }
        return [$valueBtnNavBar, $linkBtnNavBar];
    }
}
