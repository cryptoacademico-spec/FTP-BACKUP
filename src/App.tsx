import React, { useState } from 'react';
import { CheckCircle2, Circle, Terminal, Settings, FolderClock, ShieldCheck, MonitorPlay, Copy, Check, Globe, LayoutList, Key, User, MapPin, Database } from 'lucide-react';

/**
 * Checklist Pro para el canal de RIVERITA TECH.
 * Instalación FTP y Configuración de Backup para vCenter.
 */
const ChecklistApp = () => {
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "1. Instalación del Servicio",
      icon: <Terminal className="w-6 h-6" />,
      completed: false,
      commands: [
        { id: "c1", label: "Actualizar repositorios", code: "sudo apt update" },
        { id: "c2", label: "Instalar vsftpd", code: "sudo apt install vsftpd -y" }
      ]
    },
    {
      id: 2,
      title: "2. Configuración de vsftpd.conf",
      icon: <Settings className="w-6 h-6" />,
      completed: false,
      commands: [
        { id: "c3", label: "Activar permisos de escritura", code: "sudo sed -i 's/#write_enable=YES/write_enable=YES/' /etc/vsftpd.conf" },
        { id: "c4", label: "Permitir usuarios locales", code: "sudo sed -i 's/#local_enable=YES/local_enable=YES/' /etc/vsftpd.conf" },
        { id: "c5", label: "Configuración IPv4 (Listen YES)", code: "sudo sed -i 's/listen=NO/listen=YES/' /etc/vsftpd.conf" },
        { id: "c6", label: "Configuración IPv6 (Listen NO)", code: "sudo sed -i 's/listen_ipv6=YES/listen_ipv6=NO/' /etc/vsftpd.conf" },
        { id: "c7", label: "Agregar regla de seguridad chroot", code: "echo \"allow_writeable_chroot=YES\" | sudo tee -a /etc/vsftpd.conf" }
      ]
    },
    {
      id: 3,
      title: "3. Preparación de Carpeta y Reinicio Servicio",
      icon: <FolderClock className="w-6 h-6" />,
      completed: false,
      commands: [
        { id: "c8", label: "Crear carpeta de destino", code: "mkdir -p /home/usuarioftp/backups" },
        { id: "c9", label: "Asignar propiedad al usuario", code: "sudo chown -R usuarioftp:usuarioftp /home/usuarioftp/backups" },
        { id: "c10", label: "Reiniciar el servicio FTP", code: "sudo systemctl restart vsftpd" }
      ]
    },
    {
      id: 4,
      title: "4. Verificación del Sistema",
      icon: <ShieldCheck className="w-6 h-6" />,
      completed: false,
      commands: [
        { id: "c11", label: "Verificar estado del servicio", code: "sudo systemctl status vsftpd" },
        { id: "c12", label: "Verificar puerto 21", code: "sudo ss -tlpn | grep :21" },
        { id: "c13", label: "Verificar espacio en disco", code: "df -h" }
      ]
    },
    {
      id: 5,
      title: "5. Configuración de FTP en el vCenter",
      icon: <MonitorPlay className="w-6 h-6" />,
      completed: false,
      commands: [
        { id: "c14", label: "Acceso VAMI", code: "https://vcsa-c.DiegoVmware.local:5480", icon: <Globe className="w-3 h-3"/> },
        { id: "c15", label: "Sección", code: "Pestaña Backup", icon: <LayoutList className="w-3 h-3"/>, noCopy: true },
        { id: "c16", label: "Ruta", code: "ftp://192.168.170.17/backups", icon: <MapPin className="w-3 h-3"/> },
        { id: "c17", label: "Usuario", code: "usuarioftp", icon: <User className="w-3 h-3"/> },
        { id: "c18", label: "Contraseña", code: "(Tu contraseña de Usuario)", icon: <Key className="w-3 h-3"/>, noCopy: true }
      ]
    }
  ]);

  const [copiedCommands, setCopiedCommands] = useState(new Set());

  const toggleStep = (id) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  const copyToClipboard = (text, commandId) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopiedCommands(prev => new Set(prev).add(commandId));
      }
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans">
      {/* Header con Logo y Título */}
      <header className="max-w-4xl mx-auto mb-12 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <img 
            src="image_94f628.png" 
            alt="RIVERITA TECH Logo" 
            className="h-24 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="text-3xl font-black text-blue-500 tracking-tighter text-center mt-2">
            DIEGO <span className="text-emerald-500">VMWARE</span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-center uppercase tracking-tight">
          <span className="block text-white">Instalación FTP y</span>
          <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Configuración Backup vCenter
          </span>
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-emerald-500 mt-4 rounded-full" />
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        {steps.map((step) => (
          <div 
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`group cursor-pointer transition-all duration-500 border-2 rounded-2xl overflow-hidden ${
              step.completed 
                ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                : 'bg-slate-900/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60'
            }`}
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-xl transition-colors ${step.completed ? 'bg-emerald-500 text-emerald-950' : 'bg-blue-500/10 text-blue-400'}`}>
                  {step.icon}
                </div>
                <div>
                  <h2 className={`text-xl md:text-2xl font-bold transition-colors ${step.completed ? 'text-emerald-400' : 'text-slate-100'}`}>
                    {step.title}
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                    {step.completed ? 'Tarea Finalizada' : 'Pendiente de ejecución'}
                  </p>
                </div>
              </div>
              <div>
                {step.completed 
                  ? <CheckCircle2 className="w-10 h-10 text-emerald-500 fill-emerald-500/10 animate-in zoom-in duration-300" /> 
                  : <Circle className="w-10 h-10 text-slate-800 group-hover:text-slate-700" />
                }
              </div>
            </div>

            {/* Panel de Detalles (Se oculta al completar) */}
            <div className={`px-6 pb-6 transition-all duration-700 ${step.completed ? 'max-h-0 opacity-0 py-0 overflow-hidden' : 'max-h-[1000px] opacity-100'}`}>
              <div className="space-y-4">
                {step.commands && step.commands.map((cmd) => (
                  <div 
                    key={cmd.id} 
                    className="bg-black/40 rounded-xl p-4 border border-slate-800/50 flex justify-between items-center group/cmd hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex-1 mr-4">
                      <div className="flex items-center gap-2 mb-1">
                        {cmd.icon && <span className="text-blue-500 opacity-60">{cmd.icon}</span>}
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">{cmd.label}</p>
                      </div>
                      <code className="text-sm text-blue-400 font-mono break-all font-medium leading-relaxed">
                        {cmd.code}
                      </code>
                    </div>
                    
                    {!cmd.noCopy && (
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          copyToClipboard(cmd.code, cmd.id); 
                        }}
                        className={`p-3 rounded-lg transition-all active:scale-90 border flex-shrink-0 ${
                          copiedCommands.has(cmd.id) 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-blue-400 hover:text-blue-400 shadow-xl'
                        }`}
                      >
                        {copiedCommands.has(cmd.id) ? (
                          <Check className="w-5 h-5 animate-in zoom-in duration-200" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {step.completed && (
              <div className="bg-emerald-500 text-emerald-950 py-2 px-6 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.4em]">
                <Check className="w-4 h-4" strokeWidth={4} />
                Paso validado correctamente
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="max-w-4xl mx-auto mt-16 pb-12 text-center">
        <div className="text-slate-700 text-[10px] uppercase tracking-[0.5em] font-black">
          Laboratorio de Virtualización • RIVERITA TECH • {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <ChecklistApp />;
}
