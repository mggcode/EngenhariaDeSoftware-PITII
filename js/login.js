class Conta {
    verify() {
        const [email, senha] = getData()
        const id = localStorage.getItem('id')

        for (let i = 1; i < id; i++) {
            const { e: emailSis, s: senhaSis } = JSON.parse(localStorage.getItem(`conta${i}`))


            if (email === emailSis && senha === senhaSis) {
                this.approved(email)
                break
            }

            if (i === id - 1) {
                this.disapproved()
            }
        }
    }

    approved(email) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login aprovado, você sera redirecionado(a) a tela inicial',
            showConfirmButton: false,
            timer: 1500,
            confirmButtonColor: "#DD6B55"
        })
        localStorage.setItem('userLogado', email)

        setTimeout(function () {
            window.location.href = 'index.html'
        }, 1500)


    }

    disapproved() {
        limparInput()
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'senha e/ou usuarios incorreto(s)',
            confirmButtonColor: "#DD6B55"

        
        })
    }
}

document.querySelector('#login-btn').addEventListener('click', () => {
    const conta = new Conta()
    conta.verify()
})



const getData = () => [document.querySelector('#email').value,
document.querySelector('#senha').value
]

const limparInput = () => {
    document.querySelector('#senha').value = ''
}
