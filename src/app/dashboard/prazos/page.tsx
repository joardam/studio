
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { format, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const periodosLetivos = ["2025.1", "2025.2", "2026.1"];
const processos = ["Monitoria", "Estágio Obrigatório", "TCC"];

const etapasPorProcesso: Record<string, string[]> = {
    "Monitoria": ["Inscrição de Candidatos", "Seleção de Monitores", "Submissão de Relatório Mensal", "Submissão de Relatório Final"],
    "Estágio Obrigatório": ["Envio de Termo de Compromisso", "Submissão de Relatório Parcial", "Submissão de Relatório Final"],
    "TCC": ["Definição do Tema", "Entrega do Pré-Projeto", "Entrega da Versão Final", "Apresentação para a Banca"],
};

// Mock de dados existentes
const prazosMock: Record<string, any> = {
    '2025.1-Monitoria': [
        { etapa: 'Inscrição de Candidatos', inicio: new Date('2025-02-01'), fim: new Date('2025-02-15') },
        { etapa: 'Seleção de Monitores', inicio: new Date('2025-02-16'), fim: new Date('2025-02-28') },
    ],
    '2025.2-TCC': [
        { etapa: 'Definição do Tema', inicio: new Date('2025-08-01'), fim: new Date('2025-08-30') },
    ]
};

type Prazo = {
    etapa: string;
    inicio?: Date;
    fim?: Date;
};

type Errors = Record<number, string>;

export default function GestaoPrazosPage() {
    const { toast } = useToast();
    const [selectedPeriodo, setSelectedPeriodo] = useState<string | null>(null);
    const [selectedProcesso, setSelectedProcesso] = useState<string | null>(null);
    const [prazos, setPrazos] = useState<Prazo[]>([]);
    const [errors, setErrors] = useState<Errors>({});
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (selectedPeriodo && selectedProcesso) {
            const key = `${selectedPeriodo}-${selectedProcesso}`;
            const etapas = etapasPorProcesso[selectedProcesso];
            const existingPrazos = prazosMock[key];

            if (existingPrazos) {
                setPrazos(existingPrazos);
                setIsEditMode(true);
            } else {
                setPrazos(etapas.map(etapa => ({ etapa })));
                setIsEditMode(false);
            }
             setErrors({});
        } else {
            setPrazos([]);
            setIsEditMode(false);
        }
    }, [selectedPeriodo, selectedProcesso]);

    const handleDateChange = (index: number, field: 'inicio' | 'fim', date?: Date) => {
        const newPrazos = [...prazos];
        newPrazos[index] = { ...newPrazos[index], [field]: date };
        setPrazos(newPrazos);
        // Clear error for this row if it exists
        if (errors[index]) {
            const newErrors = { ...errors };
            delete newErrors[index];
            setErrors(newErrors);
        }
    };
    
    const validatePrazos = () => {
        const newErrors: Errors = {};
        let hasPastDeadline = false;

        prazos.forEach((prazo, index) => {
            if (prazo.inicio && prazo.fim && isBefore(prazo.fim, prazo.inicio)) {
                newErrors[index] = 'A data de fim não pode ser anterior à data de início.';
            }
            if (isEditMode && prazo.fim && isBefore(prazo.fim, new Date())) {
                hasPastDeadline = true;
            }
        });
        
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return false;
        }
        if (hasPastDeadline) {
            setIsConfirmationOpen(true);
            return false;
        }
        return true;
    }

    const handleSave = () => {
        if (!validatePrazos()) {
            return;
        }
        confirmSave();
    };

    const confirmSave = () => {
        // Logic to save data would go here
        toast({
            title: "Sucesso!",
            description: isEditMode ? "Os prazos foram ajustados com sucesso." : "Prazos para o período letivo definidos com sucesso.",
        });
        setIsConfirmationOpen(false);
    };

    return (
        <div className="grid gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard?profile=administrativo">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Gestão de Prazos dos Processos Acadêmicos</h1>
                    <p className="text-sm text-muted-foreground">
                        Defina ou ajuste as datas para as etapas dos processos de monitoria, estágio e TCC.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Passo 1: Seleção de Contexto</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label>Selecione o Período Letivo</Label>
                        <Select onValueChange={setSelectedPeriodo} value={selectedPeriodo || ''}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent>
                                {periodosLetivos.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label>Selecione o Processo</Label>
                        <Select onValueChange={setSelectedProcesso} value={selectedProcesso || ''}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent>
                                {processos.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {selectedPeriodo && selectedProcesso && (
                <Card>
                    <CardHeader>
                        <CardTitle>Passo 2: Formulário de Prazos</CardTitle>
                        <CardDescription>
                            {isEditMode ? 'Ajuste os prazos existentes para' : 'Defina os novos prazos para'} {selectedProcesso} em {selectedPeriodo}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {prazos.map((prazo, index) => (
                            <div key={index} className="grid md:grid-cols-[1fr_auto_auto] items-start gap-4 p-4 border rounded-lg relative">
                                <div className='grid gap-1.5'>
                                    <p className="font-semibold">{prazo.etapa}</p>
                                     {errors[index] && <p className="text-xs text-destructive">{errors[index]}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Data de Início</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-[240px] justify-start text-left font-normal", !prazo.inicio && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {prazo.inicio ? format(prazo.inicio, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={prazo.inicio}
                                                onSelect={(date) => handleDateChange(index, 'inicio', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-2">
                                     <Label>Data de Fim</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-[240px] justify-start text-left font-normal", !prazo.fim && "text-muted-foreground", errors[index] && "border-destructive")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {prazo.fim ? format(prazo.fim, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={prazo.fim}
                                                onSelect={(date) => handleDateChange(index, 'fim', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSave} disabled={prazos.length === 0}>Salvar Prazos</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Aviso de Alteração</AlertDialogTitle>
                        <AlertDialogDescription>
                           Atenção: A etapa que você está alterando já foi encerrada. Deseja continuar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmSave}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}
