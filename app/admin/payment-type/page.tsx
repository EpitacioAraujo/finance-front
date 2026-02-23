'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { useGetAllPaymentTypes } from "@/hooks/paymentType/useGetAllPaymentTypes";
import { PaymentTypeModalRegister } from "@/components/sections/PaymentTypeModalRegister";

export default function Page() {
    const getAllPaymentTypesHook = useGetAllPaymentTypes()
    
    return (
        <>
            <div className="flex flex-col">
                <Text variant="h2">Tipos de pagamento</Text>
                <Text variant="body-sm" tone="muted">Gerencie os tipos de pagamento disponíveis</Text>
            </div>

           <PaymentTypeModalRegister onSuccess={getAllPaymentTypesHook.refetch} />
            
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