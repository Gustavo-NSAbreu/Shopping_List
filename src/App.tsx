import { useState } from "react"

interface ItemCompra {
  item: string
  quantidade: number
}

function App() {
  const [listaCompras, setLista] = useState<ItemCompra[]>([]);
  const [item, setItem] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);

  const handleCreateItem = () => {
    const newItem: ItemCompra = {
      item: item ?? '',
      quantidade: quantidade ?? 0
    }
    setLista([...(listaCompras ?? []), newItem]);
    setItem('');
    setQuantidade(0);
  }

  const removeItem = (index: number) => {
    const newList = listaCompras?.filter((_, i) => i !== index);
    setLista(newList);
  }

  return <div>
    <div>
      <h1>Lista de compras</h1>
      <input type="text" value={item} onChange={(e)=>{setItem(e.target.value)}} placeholder="adicione o item" />
      <input type="number" value={quantidade} onChange={(e)=>{setQuantidade(Number(e.target.value))}} placeholder="quantidade" />
      <input type="button" onClick={handleCreateItem} value="Adicionar" />
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            (listaCompras ?? []).map(
              (item, index) => <tr key={index}>
                <td>{item?.item}</td>
                <td>{item?.quantidade}</td>
                <td>
                  <button onClick={() => removeItem(index)}>Excluir</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  </div>
}

export default App
