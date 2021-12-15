# Game tic-tac-toe 

Le jeu bien connu du morpion.Le programme analyse les positions donne une valeur numérique aux cases afin de choisir comment jouer.

## Fonctionnement du Jeux 
                                         
Le programme assigne une valeur numérique à chaque case en itérant sur celles-ci 1 tour en avance pour les deux joueurs. Si le programme détermine qu'il peut gagner avec un coup, il attribut la valuer maxi (10) à cette case. Si il "voit" qu'il perd, alors il assigne la valeur -10 à cette case et sinon 0. Biensûr, les combinaisons gagnantes du jeu sont indiquées (dans le constructor de la Game) pour qu'il puisse comarer les positions.

----------|----------|----------|
|	  |          |          |
|    1    |      2   |     3 	|             
|         |          |          |                      
|---------|----------|----------|
| 	  |          |          |
|    4    |     5    |     6    |   	 
|	  |          |          |
|---------|----------|----------|
|	  |	     |	        |
|    7    | 	8    |     9    | 				
|         |	     |	        |
|---------|----------|----------|




      