import { Button } from "@/components/ui/button"
import {
    Eye,
    Filter,
    Pencil,
    Plus,
    Save,
    X,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const transactions = [
    {
        id: "TRX-001",
        description: "Salário",
        category: "Receitas",
        type: "Entrada",
        date: "15/02/2026",
        amount: "R$ 5.200,00",
        status: "Confirmada",
    },
    {
        id: "TRX-002",
        description: "Aluguel",
        category: "Moradia",
        type: "Saída",
        date: "10/02/2026",
        amount: "R$ 1.800,00",
        status: "Confirmada",
    },
    {
        id: "TRX-003",
        description: "Supermercado",
        category: "Alimentação",
        type: "Saída",
        date: "08/02/2026",
        amount: "R$ 420,50",
        status: "Pendente",
    },
]

export default function TransactionsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Transações</h1>
                    <p className="text-muted-foreground text-sm">
                        Cadastre e acompanhe todas as transações do mês.
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon" aria-label="Cadastrar transação">
                            <Plus className="size-4" />
                            <span className="sr-only">Cadastrar transação</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Nova transação</DialogTitle>
                            <DialogDescription>
                                Preencha as informações da transação para registrar no sistema.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="transaction-description">Descrição</Label>
                                <Input
                                    id="transaction-description"
                                    placeholder="Ex: Pagamento de fornecedor"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="transaction-category">Categoria</Label>
                                <Select>
                                    <SelectTrigger id="transaction-category" className="w-full">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="receitas">Receitas</SelectItem>
                                        <SelectItem value="moradia">Moradia</SelectItem>
                                        <SelectItem value="alimentacao">Alimentação</SelectItem>
                                        <SelectItem value="servicos">Serviços</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="transaction-type">Tipo</Label>
                                <Select>
                                    <SelectTrigger id="transaction-type" className="w-full">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="entrada">Entrada</SelectItem>
                                        <SelectItem value="saida">Saída</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="transaction-status">Status</Label>
                                <Select>
                                    <SelectTrigger id="transaction-status" className="w-full">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="confirmada">Confirmada</SelectItem>
                                        <SelectItem value="pendente">Pendente</SelectItem>
                                        <SelectItem value="cancelada">Cancelada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="transaction-date">Data</Label>
                                <Input id="transaction-date" type="date" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="transaction-amount">Valor</Label>
                                <Input id="transaction-amount" placeholder="R$ 0,00" />
                            </div>
                            <div className="grid gap-2 sm:col-span-2">
                                <Label htmlFor="transaction-notes">Observações</Label>
                                <Input
                                    id="transaction-notes"
                                    placeholder="Digite observações relevantes"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" size="icon" aria-label="Cancelar">
                                <X className="size-4" />
                                <span className="sr-only">Cancelar</span>
                            </Button>
                            <Button size="icon" aria-label="Salvar transação">
                                <Save className="size-4" />
                                <span className="sr-only">Salvar transação</span>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de transações</CardTitle>
                    <CardDescription>
                        Use os filtros para encontrar transações específicas.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-end gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="filter-search">Buscar</Label>
                            <Input id="filter-search" placeholder="Descrição ou ID" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="filter-type">Tipo</Label>
                            <Select>
                                <SelectTrigger id="filter-type" className="w-[160px]">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="entrada">Entrada</SelectItem>
                                    <SelectItem value="saida">Saída</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="filter-status">Status</Label>
                            <Select>
                                <SelectTrigger id="filter-status" className="w-[160px]">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="confirmada">Confirmada</SelectItem>
                                    <SelectItem value="pendente">Pendente</SelectItem>
                                    <SelectItem value="cancelada">Cancelada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="filter-from">De</Label>
                            <Input id="filter-from" type="date" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="filter-to">Até</Label>
                            <Input id="filter-to" type="date" />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" aria-label="Limpar filtros">
                                <X className="size-4" />
                                <span className="sr-only">Limpar filtros</span>
                            </Button>
                            <Button size="icon" aria-label="Filtrar">
                                <Filter className="size-4" />
                                <span className="sr-only">Filtrar</span>
                            </Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                        {transaction.id}
                                    </TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>{transaction.category}</TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="icon-sm"
                                                variant="outline"
                                                aria-label="Ver transação"
                                            >
                                                <Eye className="size-4" />
                                                <span className="sr-only">Ver transação</span>
                                            </Button>
                                            <Button size="icon-sm" aria-label="Editar transação">
                                                <Pencil className="size-4" />
                                                <span className="sr-only">Editar transação</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}