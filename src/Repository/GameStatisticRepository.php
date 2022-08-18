<?php

namespace App\Repository;

use App\Entity\GameStatistic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method GameStatistic|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameStatistic|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameStatistic[]    findAll()
 * @method GameStatistic[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameStatisticRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GameStatistic::class);
    }

    // /**
    //  * @return GameStatistic[] Returns an array of GameStatistic objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GameStatistic
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
