<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;

class CookieService 
{
    protected $requestStack;
    
    public function __construct(
        RequestStack $requestStack
    ) {
        $this->requestStack = $requestStack;
    }

    public function getCookie(string $key)
    {
        $request = $this->requestStack->getCurrentRequest();
        $cookies = $request->cookies;
        
        if ($cookies->has($key)) {
            return $cookies->get($key);
        } 

        return null;
    }

    public function setCookie(string $key, string $value) 
    {
        $cookie = new Cookie($key, $value, strtotime('now + 60 minutes'));
        $response = new Response();
        $response->headers->setCookie($cookie);
        $response->send();
    }

    public function clearCookie(string $key)
    {
        $response = new Response();
        $response->headers->clearCookie($key);
        $response->send();
    }

    public function editCookie(string $key, string $value)
    {
        $this->clearCookie($key);
        $this->setCookie($key, $value);
    }
}
