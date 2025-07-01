import { useToast } from "@/components/ui/use-toast";

export function useAppToast() {
  const toast = useToast();

  return {
    toastSuccess: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default",
      });
    },
    toastError: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
    toastAction: (title: string, action: { label: string; handler: () => void }) => {
      toast({
        title,
        action: (
          <button 
            onClick={action.handler}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {action.label}
          </button>
        ),
      });
    },
  };
}