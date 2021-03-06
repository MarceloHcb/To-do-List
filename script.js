/* 
<label class="todo-item">
    <input type="checkbox" name="" id="">
    <div>teste de item 1</div>
    <input type="button" value="x">
</label> */
let banco = []
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label");
    item.classList.add("todo-item")
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <button  type="button" class="botao" data-indice=${indice}> "" </button>
    `
    document.getElementById("todoList").appendChild(item)
}
const limparTarefas = () => {
    const todoList = document.getElementById("todoList")
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}
const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}
const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco));
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value
    if (tecla === "Enter") {
        const banco = getBanco();
        banco.push({ "tarefa": texto, "status": "" })
        setBanco(banco)
        atualizarTela()
        evento.target.value = ""
    }
}
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco)
    atualizarTela()
}
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela()
}
const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === "button") {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}
document.getElementById("new-item").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);
atualizarTela()
