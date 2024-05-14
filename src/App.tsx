import { useState } from "react"

interface ItemCompra {
  item: string
  quantidade: number,
  bought?: boolean
}

export default function App() {
  const [listaCompras, setLista] = useState<ItemCompra[]>([]);
  const [listTitle, setListTitle] = useState<string>('Lista de compras');
  const [item, setItem] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>();

  const handleCreateItem = () => {
    const newItem: ItemCompra = {
      item: item ?? '',
      quantidade: Number(quantidade ?? '0')
    }

    if(newItem.quantidade <= 0) {
      alert('Quantidade deve ser maior que 0')
      return;
    }
    if(!newItem.item.trim()) {
      alert('item não pode estar vazio');
      return;
    }
    
    setLista([...(listaCompras ?? []), newItem]);
    setItem('');
    setQuantidade('0');
  }

  const removeItem = (index: number) => {
    const newList = listaCompras?.filter((_, i) => i !== index);
    setLista(newList);
  }

  const setAsBought = (index: number) => {
    const newList = listaCompras?.map((item, i) => {
      if (i === index) {
        return { ...item, bought: true }
      }
      return item;
    });
    setLista(newList);
  }

  return (
    <div className="bg-blue-900 text-white min-h-screen">
      <div className="p-5">
        <input className="text-4xl mb-5 bg-transparent" value={listTitle} onChange={(e)=>setListTitle(e.target.value)} />
        <br/>
        <input className="bg-blue-800 p-2 rounded mr-2" type="text" value={item} onChange={(e)=>{setItem(e.target.value)}} placeholder="adicione o item" />
        <input className="bg-blue-800 p-2 rounded mr-2" type="number" value={quantidade} onChange={(e)=>{setQuantidade(e.target.value)}} placeholder="quantidade" />
        <input className="bg-blue-700 p-2 rounded text-white" type="button" onClick={handleCreateItem} value="Adicionar" />
      </div>
      <div className="p-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th className="text-left">Quantidade</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              (listaCompras ?? []).map(
                (item, index) => <tr className={item.bought ?"line-through":undefined} key={index}>
                  <td>{item?.item}</td>
                  <td>{item?.quantidade}</td>
                  <td>
                    <button className="bg-red-500 p-2 rounded text-white mr-2" onClick={() => removeItem(index)}>Excluir</button>
                    <button className="bg-green-500 p-2 rounded text-white" onClick={() => setAsBought(index)}>Comprar</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <button className="bg-red-500 p-2 rounded text-white mt-5" onClick={() => setLista([])}>Limpar lista</button>
      </div>
    </div>
  );
}


