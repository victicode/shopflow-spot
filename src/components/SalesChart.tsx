import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Package, DollarSign, Users } from "lucide-react";

const SalesChart = () => {
  const salesData = [
    { month: "Ene", ventas: 1240, ingresos: 371000 },
    { month: "Feb", ventas: 1890, ingresos: 567000 },
    { month: "Mar", ventas: 2340, ingresos: 702000 },
    { month: "Abr", ventas: 1950, ingresos: 585000 },
    { month: "May", ventas: 2680, ingresos: 804000 },
    { month: "Jun", ventas: 3120, ingresos: 936000 },
    { month: "Jul", ventas: 2840, ingresos: 852000 },
    { month: "Ago", ventas: 3250, ingresos: 975000 },
    { month: "Sep", ventas: 2950, ingresos: 885000 },
    { month: "Oct", ventas: 3400, ingresos: 1020000 },
    { month: "Nov", ventas: 3680, ingresos: 1104000 },
    { month: "Dic", ventas: 4120, ingresos: 1236000 }
  ];

  const stats = [
    {
      title: "Ventas Totales",
      value: "35,465",
      change: "+12.5%",
      icon: Package,
      color: "text-marketplace-orange"
    },
    {
      title: "Ingresos Generados",
      value: "$10.6M",
      change: "+8.2%",
      icon: DollarSign,
      color: "text-marketplace-success"
    },
    {
      title: "Clientes Únicos",
      value: "28,320",
      change: "+15.3%",
      icon: Users,
      color: "text-marketplace-blue"
    },
    {
      title: "Tasa de Crecimiento",
      value: "23.8%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-marketplace-success">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="ventas" 
                  fill="hsl(var(--marketplace-orange))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']}
                />
                <Line 
                  type="monotone" 
                  dataKey="ingresos" 
                  stroke="hsl(var(--marketplace-success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--marketplace-success))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--marketplace-success))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights de Rendimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-marketplace-orange/10 rounded-lg">
              <h4 className="font-semibold text-marketplace-orange mb-2">Mejor Mes</h4>
              <p className="text-2xl font-bold">Diciembre</p>
              <p className="text-sm text-muted-foreground">4,120 ventas</p>
            </div>
            <div className="p-4 bg-marketplace-success/10 rounded-lg">
              <h4 className="font-semibold text-marketplace-success mb-2">Crecimiento Promedio</h4>
              <p className="text-2xl font-bold">+18.2%</p>
              <p className="text-sm text-muted-foreground">Mensual</p>
            </div>
            <div className="p-4 bg-marketplace-blue/10 rounded-lg">
              <h4 className="font-semibold text-marketplace-blue mb-2">Proyección 2024</h4>
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-muted-foreground">Unidades vendidas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesChart;