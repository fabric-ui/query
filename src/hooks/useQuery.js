import React, {useEffect, useReducer, useState} from "react";
import ACTIONS from "./deps/dataActions";
import dataReducer from "./deps/dataReducer";
import useRequest from "./useRequest";

const init = (e) => {
   return e
}
export default function useQuery(
   {
      url,
      headers,
      parsePackage,
      fetchSize
   },
   initialSort = [],
   initialFilters = [],
   customFetch) {
   const [data, dispatchData] = useReducer(dataReducer, [], init)
   const [loading, setLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(0)
   const [filters, setFilters] = useState(initialFilters)
   const [sorts, setSorts] = useState(initialSort)
   const [hasMore, setHasMore] = useState(false)
   const {make} = useRequest(false)
   const fetchParams = (page = undefined) => {
      let pack = {
         page: page !== undefined ? page : currentPage,
         quantity: fetchSize,
         filters: [...filters],
         sorts: [...sorts]
      }
      if (typeof parsePackage === 'function')
         pack = parsePackage(pack)

      pack.filters = JSON.stringify(pack.filters)
      pack.sorts = JSON.stringify(pack.sorts)

      return {
         method: 'GET',
         headers: {...headers, 'content-type': 'application/json'}, url: url,
         params: pack,
      }
   }
   const fetchData = (page = undefined) => {
      setLoading(true)
      let promise
      if (customFetch)
         promise = customFetch(page, filters, sorts)
      else
         promise = make(fetchParams(page))

      promise.then(res => {
         dispatchData({type: ACTIONS.PUSH, payload: res.data})
         setHasMore(res.data.length > 0)
         setLoading(false)
      })
         .catch(() => {
            setLoading(false)
         })
   }
   useEffect(() => {
      if (currentPage > 0)
         fetchData(currentPage)
   }, [currentPage])

   useEffect(() => {
      clean()
   }, [filters, sorts])

   const clean = () => {

      setHasMore(false)
      setCurrentPage(0)
      dispatchData({type: ACTIONS.EMPTY})


      fetchData(0)
   }

   return {
      data,
      filters,
      setFilters,
      sorts, setSorts,
      setCurrentPage,
      currentPage,
      hasMore,
      loading,
      clean,
      dispatchData
   }
}
