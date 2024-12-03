
//objeto literal dos produtos que o site possui
const products = {
  0: {
    nome: 'Rainbow Cupcake',
    desc: 'Saboroso e colorido..',
    valor: 8.5,
    img: '<img src="assets/image/cupcake1.png">',
    qtd: 1
  },

  1: {
    nome: "Sunshine Lemon",
    desc: "manjar dos deuses..",
    valor: 7.75,
    img: '<img src="assets/image/cupcake2.png">',
    qtd: 1
  },

  2: {
    nome: "Choconuts Bliss",
    desc: "manjar dos deuses..",
    valor: 12.25,
    img: '<img src="assets/image/cupcake3.png">',
    qtd: 1
  },

  3: {
    nome: "Delícia Morango Supremo",
    desc: "manjar dos deuses..",
    valor: 14.99,
    img: '<img src="assets/image/cupcake4.png">',
    qtd: 1
  },

  4: {
    nome: "Chocolate Mint Bliss",
    desc: "manjar dos deuses..",
    valor: 13.99,
    img: '<img src="assets/image/cupcake5.png">',
    qtd: 1
  },

  5: {
    nome: "Blueberry Dream Delight",
    desc: "manjar dos deuses..",
    valor: 12.99,
    img: '<img src="assets/image/cupcake6.png">',
    qtd: 1
  },

  6: {
    nome: "Ébano e Marfim",
    desc: "manjar dos deuses..",
    valor: 14.95,
    img: '<img src="assets/image/cupcake7.png">',
    qtd: 1
  },

  7: {
    nome: "Pineapple Paradise",
    desc: "manjar dos deuses..",
    valor: 6.90,
    img: '<img src="assets/image/cupcake8.png">',
    qtd: 1
  },

  8: {
    nome: "Chocoberry Star",
    desc: "Manjar dos deuses..",
    valor: 10.00,
    img: '<img src="assets/image/cupcake9.png">',
    qtd: 1
  },
  // PRODUTOS DA PAGINA DE PRODUTOS, COMEÇANDO DO 20
  20: {
    nome: "Sol Tropical de Manga",
    desc: "Manjar dos Deuses",
    valor: 7.75,
    img: '<img src="assets/image/cupcake10.png">',
    qtd: 1
  },
  21: {
    nome: "Rubro Delícia de Baunilha",
    desc: "Delicia de amor",
    valor: 11.99,
    img: '<img src="assets/image/cupcake11.png">',
    qtd: 1
  },
  22: {
    nome: "Sunshine Lemon",
    desc: "Delícias Soberanas",
    valor: 9.99,
    img: '<img src="assets/image/cupcake12.png">',
    qtd: 1
  },
  23: {
    nome: "Gold Cupcake",
    desc: "Delicias Soberanas",
    valor: 16.99,
    img: '<img src="assets/image/cupcake13.png">',
    qtd: 1
  },
  24: {
    nome: "Beautiful Day",
    desc: "Delicias Soberanas",
    valor: 17.00,
    img: '<img src="assets/image/cupcake14.png">',
    qtd: 1
  },
  25: {
    nome: "Gold Black",
    desc: "Delícias soberanas",
    valor: 15.99,
    img: '<img src="assets/image/cupcake15.png">',
    qtd: 1
  },
  26: {
    nome: "Cupcake Vegano",
    desc: "Delicias Soberanas",
    valor: 14.99,
    img: '<img src="assets/image/cupcake16.png">',
    qtd: 1
  },
  27: {
    nome: "Cupcake Banana",
    desc: "Delicias Soberanas",
    valor: 599.00,
    img: '<img src="assets/image/cupcake17.png">',
    qtd: 1
  },

}

//gera o objeto do id clicado no site
class Product {
  constructor(id) {
    // desconstroi o objeto selecionado com o id, e gera variaveis individuais
    const { nome,
      desc,
      valor,
      img,
      qtd
    } = products[id]
    //

    //pega os valores individuais do objeto selecionado com base no id e coloca no objeto que vai ser gerado 
    //posteriormente na funcao que é acionada ao clicar nos botes de compra

    this.nome = nome
    this.desc = desc
    this.valor = valor
    this.img = img
    this.qtd = qtd
  }
}


///////////////////////////////////////////////////////CLIQUE///////////////////////////////////////////////////////////

//ao clicar em um dos botoes de compra, gera uma funcao
document.querySelector('body').addEventListener('click', ({
  target: {
    dataset: {
      produtoid: id
    }
  }
}) => {
  if ((id >= 0) &&
    (id <= 100) && //Adicionando Quantidade de Produtos Que o site pode ter
    (id != '')) {

    if (localStorage.getItem('userLogado')) {
      let idUserLogado = getIdUser()


      const produto = new Product(id)

      let cart = {} //cria o carrinho
      if (Object.entries(JSON.parse(localStorage.getItem(`conta${idUserLogado}`))['cart']).length === 0) {
        cart[id] = produto // se o carrinho for nulo, ele gera um carrinho novo

      } else {
        cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart // caso nao for, ele pega o carrinho ja gerado, 
        // e so atribui o produto clicado

        let possui = false 

        Object.keys(cart).forEach(el => {
          if (el === id) {
            possui = true 
          }
        })

        if (!possui) { // se o produto ja tiver no carrinho, ele n vai adicionar, e me mostre um alert- Personalizado
          cart[id] = produto
        } else {
          Swal.fire({
            title: produto.nome,
            text: 'produto ja foi adicionado no Carrinho',
            confirmButtonColor: "#DD6B55",

          })
        }

      }

      reajustarObjeto(cart) // salva o produto cart no localstorage 'cart'

      setarValores(idUserLogado) // seta os valores
    } else {
      window.location.href = 'login-page.html'
    }

  }
})








////////////////////////////////////////////////////////FUNCOES//////////////////////////////////////////////////////////

// formata o valor para R$
const formatarValorRS = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format((valor).toFixed(2))
}

// seta o texto do carrinho, com base no parametro passado na funcao
const setText = texto => {
  document.querySelector('.cart-item').innerHTML = texto
}

// pega o texto, com base no objeto, e passa para um variavel para depois usa-la no setText()
const getText = (id, {
  nome,
  desc,
  valor,
  img,
  qtd
}) => {
  let texto = ` 

  <div id="item-estilizing" class="div${id}" >
  
    <header>
      
      <figure class="imageEfect" onclick='removerFromCart(${id})'>
        ${img}
        <div id="hoverEfectImage">
        <i class="fas fa-trash-alt"></i>
        </div>
      </figure>
      <figcaption>
        <h6>${nome} </h6>
        <p>${desc}</p>
      </figcaption>
    </header>
    <li>
      
        <button class="btn plus" onclick="adicionarQtd(${id}, ${qtd})"> + </button>
        <p> ${qtd} </p>
        <button class="btn minus" onclick="removerQtd(${id}, ${qtd})"> - </button>
      
    </li>
    <section>
      <p> ${formatarValorRS((valor * qtd * 0.9))} <br /> <span style='color: red;'>10% OFF</span></p>
    </section>
  </div>`

  return texto
}

// seta o total no carrinho
const setTotal = (total) => document.querySelector('.total').innerHTML = total * 0.9 > 0
  ?
  `
  <h2>Subtotal: <b>${formatarValorRS((total * 0.9))}</b> </h2>
`
  :
  `
  <h2>Subtotal: NENHUM ITEM ESCOLHIDO </h2>
`

// pega o valor e a quantidade, com base no objeto passado e multiplica eles entri si
const getTotal = ({ valor, qtd }) => valor * qtd

//ele seta no documento, o numero de produtos no carrinho
const setNumeroProdutos = numero => document.querySelector('#cont-itens-carrinho').innerHTML = numero > 0 ? numero : ''

//ele retorna o valor de produtos no carrinho com base no objeto passado como parametro
const getNumeroProdutos = obj => Object.keys(obj).length

// ele seta os valores no documento, usando todas as outras funcoes acima
const setarValores = (id) => {
  let idUserLogado = getIdUser()
  const cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart

  let texto = ''

  Object.entries(cart).forEach(el => texto += getText(el[0], el[1]))

  let total = 0

  Object.entries(cart).forEach(el => total += getTotal(el[1]))



  let numero_de_produtos = getNumeroProdutos(cart)

  setTotal(total)
  setText(texto)
  setNumeroProdutos(numero_de_produtos)
}


// na funcao getText() ele coloca um onclick nos botoes de remover e adicionar qtd do produto, e aqui, 
// ele opera essas funcoes de remover() e adicionar()

//remover qtd do produto selecionado
const removerQtd = (id, qtd) => {
  let idUserLogado = getIdUser()
  let cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart

  if (qtd === 1) {  //se a qtd do produto selecionad com base no id for 1, ele removera do objeto carrinho, 
    delete cart[id]  //o produto em questao, e tambem removera do html
    document.querySelector(`.div${id}`).remove()
    reajustarObjeto(cart)

  } else {
    qtd--

    cart[id].qtd = qtd

    reajustarObjeto(cart)
  }
  setarValores(idUserLogado) // seta os valores atualizados
}

//adicionar qtd do produto selecionado, se atingir maior que 20 - Mostre-me um alert personalizado
const adicionarQtd = (id, qtd) => {
  let idUserLogado = getIdUser()
  let cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart

  if (qtd <= 19) { // ele trava e deixa adicionar qtd se o numero for 20, ate 19 ele deixa add mais 1, por isso 20
    qtd++

    cart[id].qtd = qtd

    reajustarObjeto(cart)
  } else {
    Swal.fire({
      title: 'Você atingiu a quantidade Maxima de produto em 1 objetivo',
      width: 600,
      padding: '3em',
      color: '#E63946',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(#E63946)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      confirmButtonColor: "#DD6B55"
    })
  }

  setarValores(idUserLogado) // seta os valores atualizados
}



// carregamento da pagina //

//ao carregar na janela, ele seta os valores 
document.body.onload = () => {
  let idUserLogado = getIdUser()
  if (localStorage.getItem(`conta${idUserLogado}`) && Object.entries(JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart).length != 0) { // ele apenas seta os valores, se o obj cart no localstorage n for nulo
    // assim, evitando algum erro
    setarValores(idUserLogado)
  }
}

const getIdUser = () => {
  for (let i = 1; i < localStorage.getItem('id'); i++) {
    if (JSON.parse(localStorage.getItem(`conta${i}`)).e === localStorage.getItem('userLogado')) {
      return i
    }
  }
}

const reajustarObjeto = (cart) => {
  let idUserLogado = getIdUser()
  const { e, s } = JSON.parse(localStorage.getItem(`conta${idUserLogado}`))

  localStorage.setItem(`conta${idUserLogado}`, JSON.stringify({ e, s, cart }))
}

// Sistema de compras em Desenvolvimento, Com alert Personalizado
const btnFinalizarCompras = document.querySelector("#btnFinalizarCarrinho")
btnFinalizarCompras.addEventListener("click", function () {
  Swal.fire({
    title: 'Me Desculpa?',
    text: 'Sistema de compras ainda esta em Desenvolvimento!',
    confirmButtonColor: "#DD6B55",
    icon: 'question'
  })
})

const removerFromCart = id => {
  let idUserLogado = getIdUser()
  let cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart
  delete cart[id]
  document.querySelector(`.div${id}`).remove()
  reajustarObjeto(cart)
  setarValores(id)
}
