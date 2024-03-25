//Criando e inicializando o vetor das casas
//As casas inician com 9 para sabermos que não foram utilizadas.
var casas = [9, 9, 9, 9, 9, 9, 9, 9, 9];
//Criando uma variável de indicará o jogador da vez
var iVez = 1; //(1) xis (-1) bola
//Criando uma variável que contará os cliques
var iContaClique = 0;
//Criando as variáveis do placar
var iPontosX=0;
var iPontosO=0;
var iPontosV=0;
//Criando variável para mensagens
var sResposta="";
//****************************************************************
//Função que facilitará o uso do getElementById
function id(idDesejado){
    return document.getElementById(idDesejado);
}
//****************************************************************
//Função que verifica as jogadas
function verificar(indCasa){
    //Verificar se a casa não foi clicada
    if(casas[indCasa]==9){
        //Modificar o valor do vetor com o jogador da vez
        casas[indCasa] = iVez;
        if(iVez==1){
            id("img"+indCasa).src="IMAGES/xis.jpg";
        }else{
            id("img"+indCasa).src="IMAGES/bola.jpg";
        }
        //inverte o jogador da vez
        iVez*=-1; //iVez = iVez * -1
        iContaClique++;
        confere();
    }
}
//****************************************************************
//Função que confere se houve ganhador
function confere(){
    var i;
    //Variavel que marca se houve ganhador
    var lGanhou = false;
    //Variável que marca se o jogo acabou
    var lAcabou = true;
    //Percorre o vetor se ainda existe alguma casa não clicada(9)
    for(i=0;i<casas.length;i++){
        if(casas[i]==9){
            lAcabou=false;
        }
    }
    if(iContaClique==9){
        lAcabou=true;
    }
    //Vetor que armazenara a soma das linhas, colunas e diagonal
    var aiSoma=[];
    aiSoma[0]= casas[0]+casas[1]+casas[2]; //Linha 1
    aiSoma[1]= casas[3]+casas[4]+casas[5]; //Linha 2
    aiSoma[2]= casas[6]+casas[7]+casas[8]; //Linha 3
    aiSoma[3]= casas[0]+casas[3]+casas[6]; //Coluna 1
    aiSoma[4]= casas[1]+casas[4]+casas[7]; //Coluna 2
    aiSoma[5]= casas[2]+casas[5]+casas[8]; //Coluna 3
    aiSoma[6]= casas[0]+casas[4]+casas[8]; //Diagonal 1
    aiSoma[7]= casas[2]+casas[4]+casas[6]; //Diagonal 2
    //Percorr o vetor procurando a soma 3 ou -3
    for(i=0;i<aiSoma.length;i++){
        //se achou 3, é porque o xis ganhou
        if(aiSoma[i]==3){
            lGanhou=true;
            sResposta="XIS ganhou!!!";
            iPontosX++;
            id("xis").innerHTML = "PONTO X: "+iPontosX;
            break;
        }else if(aiSoma[i]==-3){
            lGanhou=true;
            sResposta="BOLINHA ganhou!!!";
            iPontosO++;
            id("bola").innerHTML = "PONTOS O: "+iPontosO;
            break;
        }
    }
    //se nem bola e nem xis foram ganhadores, e o jogo acabou, é porque  deu velha
    if(lGanhou==false && lAcabou==true){
        sResposta="DEU VELHA!!!";
        iPontosV++;
        id("velha").innerHTML = "VELHA...:"+iPontosV;
    }
    //Se houver ganhador, então será necessário desabilitar as casas para que não sejam clicadas
    if(lAcabou || lGanhou){
        for(i-0;i<casas.length;i++){
            id("casa"+i).disabled = true;
            casas[i]=0;
        }
        id("resposta").innerHTML =sResposta;
        id("resposta").style.color ="#CB9316";
    }
}
//****************************************************************
//Função que confere se houve ganhador
function recomecar(){
    for(i=0;i<casas.length;i++){
        //Habilitar as casas
        id("casa"+i).disabled = false;
        //Remover as imagens
        id("img"+i).src="";
        casas[i]=9;
        //Para evitar problemas com o arrasto, vamos desabilitalos
        id("img"+i).ondragstart = function(){return false;};
    }
    id("resposta").innerHTML="RESULTADO";
    id("resposta").style.color="#F5FF00";
    lGanhou =false;
    lAcabou =true;
    iContaClique =0;
    iVez =1;
}