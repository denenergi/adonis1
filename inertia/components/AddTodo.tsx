import { FC, useEffect, useRef, useState } from "react";
import { TodoService } from "../services/todo.service";
import { toast } from "react-toastify";
import { ITodo } from "../types/todo";

interface Props {
    type: 'post' | 'patch'
    todo: ITodo | null
    setChangeTodo: (todo: ITodo | null) => void
    setVisibleModal: (visible: boolean) => void
}


const AddTodo: FC<Props> = ({ type, todo, setVisibleModal, setChangeTodo }) => {
    const [name, setName] = useState('');
    const [descriptions, setDescriptions] = useState<string | null>('');
    const [file, setFile] = useState<any>(null);
    const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(null);
    const refFile = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log(todo)
        if (type === "patch" && todo !== null) {
            setName(todo.name);
            setDescriptions(todo.descriptions)
            setFile(todo.file)
        }
    }, [type, todo])

    const imageChange = (e: any) => {
        const data = new FileReader();
        data.addEventListener('load', () => {
            setFilePreview(data.result)
            console.log(e.target.files[0])
            setFile(e.target.files[0])
        })
        data.readAsDataURL(e.target.files[0])
    };

    const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await TodoService.postTodo({ name, descriptions, file });
            if (data) {
                toast.success('Todo has been added.');
            }
            setName('')
            setDescriptions('')
            setFile('')
            if (refFile.current) {
                refFile.current.value = "";
            }
            setChangeTodo(null)
            setVisibleModal(false)
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error)
        }
    }
    const editTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (todo) {
                const editTodo: ITodo = {
                    ...todo,
                    name,
                    descriptions,
                    file: file
                }
                const data = await TodoService.editTodo(editTodo);
                if (data) {
                    toast.success('Todo has been updated.');
                }
            }
            setName('')
            setDescriptions('')
            setFile('')
            if (refFile.current) {
                refFile.current.value = "";
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error)
        }

        setVisibleModal(false)
    }
    return (
        <div className="absolute w-full h-full bg-sky-400 opacity-90 top-0">
            <form className="flex flex-col gap-3 sticky top-5 left-1/2 w-1/2 -translate-x-1/2" action='/todos' method={type} onSubmit={(e) => type === 'post' ? addTodoHandler(e) : editTodoHandler(e)}>
                <input type="text" className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="text" className="input" placeholder="Description" value={descriptions ? descriptions : ''} onChange={e => setDescriptions(e.target.value)} />
                <input type="file" formEncType="multipart/form-data" className="input" accept="image/png, image/jpeg" onChange={imageChange} ref={refFile} />
                {filePreview && (
                    <div className="h-96 flex justify-center">
                        <img
                            className="object-contain h-96"
                            src={filePreview?.toString()}
                            alt="image"
                        />
                    </div>
                )}
                <div className="flex items-center gap-2 justify-between">
                    <button className="btn btn-green" type="submit">
                        {type === 'patch' ? 'Save' : 'Create'}
                    </button>
                    <button className="btn btn-red" onClick={() => {
                        setVisibleModal(false)
                        setChangeTodo(null)
                    }}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default AddTodo