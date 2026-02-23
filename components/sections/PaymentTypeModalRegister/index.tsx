import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useCreatePaymentType } from "@/hooks/paymentType/useCreatePaymentType";
import { Plus, Save, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

type Props = {
    onSuccess?: () => void;
}

export function PaymentTypeModalRegister({ onSuccess }: Props) {
    const createPaymentTypeHook = useCreatePaymentType()
    const [open, setOpen] = useState(false)
    
    const paymentTypeForm = useForm({
        defaultValues: {
            name: "",
            cycle_type: "",
            cycle_day_start: "",
            cycle_day_end: "",
        },
    })

    const handleSubmit = paymentTypeForm.handleSubmit(async (data) => {
        await createPaymentTypeHook.execute({
            name: data.name,
            cycle_type: data.cycle_type,
            cycle_day_start: Number(data.cycle_day_start),
            cycle_day_end: Number(data.cycle_day_end),
        }).then(() => {
            onSuccess?.()
            paymentTypeForm.reset()
            paymentTypeForm.clearErrors()
            setOpen(false)
        }).catch((error) => {
            Object.entries((error?.data ?? {})).forEach(([key, value]) => {
                paymentTypeForm.setError(key as any, { message: String(value) })
            })
        })
    })

    const handleOpenChange = async (nextOpenState: boolean) => {
        paymentTypeForm.reset()
        paymentTypeForm.clearErrors()
        setOpen(nextOpenState)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
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
                            <Controller
                                control={paymentTypeForm.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            id="payment-type-name"
                                            placeholder="Ex: Cartão de crédito"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                        {fieldState.error?.message && (
                                            <Text variant="body-sm" tone="destructive">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="payment-type-cycle">Tipo do ciclo</Label>
                            <Controller
                                control={paymentTypeForm.control}
                                name="cycle_type"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                            <SelectTrigger id="payment-type-cycle" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="daily">Diário</SelectItem>
                                                <SelectItem value="weekly">Semanal</SelectItem>
                                                <SelectItem value="monthly">Mensal</SelectItem>
                                                <SelectItem value="yearly">Anual</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error?.message && (
                                            <Text variant="body-sm" tone="destructive">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="payment-type-cycle-start">Dia de início do ciclo</Label>
                            <Controller
                                control={paymentTypeForm.control}
                                name="cycle_day_start"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            id="payment-type-cycle-start"
                                            type="number"
                                            min={0}
                                            max={31}
                                            placeholder="Ex: 1"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                        {fieldState.error?.message && (
                                            <Text variant="body-sm" tone="destructive">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="payment-type-cycle-end">Dia do fim do ciclo</Label>
                            <Controller
                                control={paymentTypeForm.control}
                                name="cycle_day_end"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            id="payment-type-cycle-end"
                                            type="number"
                                            min={0}
                                            max={31}
                                            placeholder="Ex: 30"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                        {fieldState.error?.message && (
                                            <Text variant="body-sm" tone="destructive">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </form>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Cancelar"
                            onClick={() => handleOpenChange(false)}
                        >
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
    )
}