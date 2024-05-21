import { AnalyzeData, Orders } from "../pages";

export type leafType = Omit<rootType, 'children'>;
export type rootType = {
    path: string;
    element?: JSX.Element;
    name?: string;
    children?: (rootType | leafType)[];
};

const routes: rootType[] = [
    { path: '*', name: 'error' },
    {
        path: '/',
        element: <Orders />,
        name: 'Tela Inicial',
        children: [{
            path: 'analyzeData',
            element: <AnalyzeData />,
            name: 'Dados'
        }]
    },
    {
        path: 'analyzeData',
        element: <AnalyzeData />,
        name: 'Dados',
        children:[]
    }
];

export default routes;