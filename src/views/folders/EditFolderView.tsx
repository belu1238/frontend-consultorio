import { useLocation} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFolderById } from "../../api/FolderAPI";
import EditModalData from "../../components/folders/EditModalData";

export default function EditFolderView() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const folderId = queryParams.get('editFolder')
    const parsedFolderId = Number(folderId);
    
    const {data, isLoading} = useQuery({
            queryKey: ['updateFolder', folderId],
            queryFn: () => getFolderById(parsedFolderId),
            retry: false,
            enabled: folderId !== null // solo ejecuta la query si editFolder EXISTE en la URL.
        })

        if(isLoading) return <p>Cargando..</p>
        if(data) return <EditModalData data={data} folderId={parsedFolderId}/>
}
