'use client'

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Dialog } from "@radix-ui/react-dialog";
import { Plus, Save, X } from "lucide-react";
import { useCreatePaymentType } from "@/hooks/paymentType/useCreatePaymentType";
import { useGetAllPaymentTypes } from "@/hooks/paymentType/useGetAllPaymentTypes";
import { Controller, useForm } from "react-hook-form";

export default function Page() {
    const getAllPaymentTypesHook = useGetAllPaymentTypes()
    const createPaymentTypeHook = useCreatePaymentType()

    const paymentTypeForm = useForm()

    const handleSubmit = paymentTypeForm.handleSubmit((data) => {
        createPaymentTypeHook.execute(data as any)
    })

    return (
        <>
            <div className="flex flex-col">
                <Text variant="h2">Tipos de pagamento</Text>
                <Text variant="body-sm" tone="muted">Gerencie os tipos de pagamento disponíveis</Text>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button size="icon" aria-label="Cadastrar forma de pagamento">
                        <Plus className="size-4" />
                        <span className="sr-only">Cadastrar forma de pagamento</span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Nova forma de pagamento</DialogTitle>
                        <DialogDescription>
                            Preencha as informações da forma de pagamento para registrar no sistema.
                        </DialogDescription>
                    </DialogHeader>

                    <form id="payment-type-form" className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="payment-type-name">Nome</Label>
                            <Input
                                id="payment-type-name"
                                placeholder="Ex: Cartão de crédito"
                                {...paymentTypeForm.register("name")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="payment-type-cycle">Tipo do ciclo</Label>
                            <Controller
                                control={paymentTypeForm.control}
                                name="cycle_type"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="payment-type-cycle" className="w-full">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weekly">Semanal</SelectItem>
                                            <SelectItem value="biweekly">Quinzenal</SelectItem>
                                            <SelectItem value="monthly">Mensal</SelectItem>
                                            <SelectItem value="yearly">Anual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="payment-type-cycle-start">Dia de início do ciclo</Label>
                            <Input
                                id="payment-type-cycle-start"
                                type="number"
                                min={1}
                                max={31}
                                placeholder="Ex: 1"
                                {...paymentTypeForm.register("cycle_day_start")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="payment-type-cycle-end">Dia do fim do ciclo</Label>
                            <Input
                                id="payment-type-cycle-end"
                                type="number"
                                min={1}
                                max={31}
                                placeholder="Ex: 30"
                                {...paymentTypeForm.register("cycle_day_end")}
                            />
                        </div>
                    </form>

                    <DialogFooter>
                        <Button variant="outline" size="icon" aria-label="Cancelar">
                            <X className="size-4" />
                            <span className="sr-only">Cancelar</span>
                        </Button>
                        <Button type="submit" size="icon" aria-label="Salvar forma de pagamento" form="payment-type-form">
                            <Save className="size-4" />
                            <span className="sr-only">Salvar forma de pagamento</span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            <Card>
                <CardHeader>
                    <CardTitle>Em construção</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Tipo do ciclo</TableHead>
                                <TableHead>Dia de início do ciclo</TableHead>
                                <TableHead>Dia do fim do ciclo</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {getAllPaymentTypesHook.data?.map((paymentType) => (
                                <TableRow key={paymentType.id}>
                                    <TableHead>{paymentType.name}</TableHead>
                                    <TableHead>{paymentType?.cycle_type ?? 'N/A'}</TableHead>
                                    <TableHead>{paymentType?.cycle_day_start ?? 'N/A'}</TableHead>
                                    <TableHead>{paymentType?.cycle_day_end ?? 'N/A'}</TableHead>
                                </TableRow>
                            )) || (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Text variant="body" tone="muted">Em breve...</Text>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}