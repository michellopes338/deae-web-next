import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../../infra/api";
import { IDeae } from "../../interface/deaes.interface";
import { DeaeComponent } from "../DeaeComponent";
import { Loader } from "../Loader";

interface Props {
  data: IDeae[]
}

export function InfiniteScrollDeae({ data }: Props) {
  const [deaes, setDeaes] = useState(data)
  const [hasMore, setHasMore] = useState(true)

  async function getMore() {
    const response = await api.get(`deaes?fields=is_valid&search=true&order=desc&offset=${deaes.length}&limit=10`)
    const loadedDeaes = response.data as IDeae[];
    if (loadedDeaes.length === 0) setHasMore(false)
    setDeaes((deaes) => [...deaes, ...loadedDeaes])
  }

  return (
    <InfiniteScroll dataLength={deaes.length} next={getMore} hasMore={hasMore} loader={<Loader />} endMessage={<h5>fim</h5>}>
      {deaes.map(deae => (
        <DeaeComponent {...deae} key={deae.id} />
      ))}
    </InfiniteScroll>
  )
}