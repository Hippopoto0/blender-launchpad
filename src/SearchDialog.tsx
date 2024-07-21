import { GrAdd } from "react-icons/gr"
import { Button } from "./components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { VersionsList, VersionsListBranch } from "./features/scraper/VersionsList"

export default function SearchDialog() {
    return <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute bottom-5 left-5 bg-teal-600 hover:bg-teal-700">
              <GrAdd />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-slate-600 pl-4">
          <DialogHeader>
            <DialogTitle className="text-white">Add Instance</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="items-start justify-start bg-slate-700">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <VersionsList/>
            </TabsContent>
            <TabsContent value="other">
              <VersionsListBranch />
            </TabsContent>
          </Tabs>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                className="bg-teal-600 hover:bg-teal-700"
                type="submit" onClick={async () => {

              }}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
}